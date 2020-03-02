import { useState, useEffect } from 'react'
import { debounce, isDev, getPageDelay, isUe4, getPageFromView } from '@/utils'
import { requestInitData, syncData, initData, changeCurrentView } from '@/utils/syncState'
import { usePrevious, } from '@/utils/hook'

export const isLocal = (str) => /^local/.test(str) && str !== 'local1'
const getAnimateName = (str, prevPage = '') => {
  if (prevPage === 'home' && str === 'local1') return 'body'
  return /^local/.test(str) ? 'two' : 'body'
} 

export function useInitData(dispatch) {
  // const [data, setData] = useState({});

  const onDataInit = (param) => {
    console.log('init data:')
    console.log(param)
    initData(param)
  }

  const onDataInitProgress = (param) => {
    console.log('init data progress')
    console.log('loaded:' + param.BytesReceived)
    console.log('total:' + param.TotalBytes)
  }

  const onDataUpdate = (param) => {
    console.log('receive data:')
    console.log(param)
    syncData(dispatch, param)
  }

  const onControlUpdate = (param) => {
    console.log('receive control:')
    console.log(param)
    syncData(dispatch, param)
  }

  const onConfigUpdate = param => {
    console.log('receive config:')
    console.log(param)
    syncData(dispatch, param)
  }

  const initUE4Event = () => {
    document.addEventListener('data_init', onDataInit)
    document.addEventListener('data_init_progress', onDataInitProgress)
    document.addEventListener('data_update', onDataUpdate)
    document.addEventListener('control_update', onControlUpdate)
    document.addEventListener('config_update', onConfigUpdate)
  }
  const removeUE4Event = () => {
    document.removeEventListener('data_init', onDataInit)
    document.removeEventListener('data_init_progress', onDataInitProgress)
    document.removeEventListener('data_update', onDataUpdate)
    document.removeEventListener('control_update', onControlUpdate)
    document.removeEventListener('config_update', onConfigUpdate)
  }

  const initEvent = () => {
    if (isUe4) {
      initUE4Event()
    } else {
      requestInitData(onDataInitProgress, onDataInit)
    }
  }

  useEffect(() => {
    initEvent()
    return removeUE4Event
  }, [])
}

export function useInit(view, dispatch, localData) {
  const changePage = (state) => dispatch({ type: 'localData/changeScreen', payload: state })
  const { page, alias } = getPageFromView(view)
  
  const prevPage = usePrevious(alias);
  const prevView = usePrevious(view);

  const [showBox, setShowBox] = useState(false)
  const [show, setShow] = useState(false)

  let tidPage, tidPageBefore, tid1, tid2
  let delay = isLocal(alias) ? 30 : 800
  if (prevPage === 'risk') {
    delay = 30
  }
  // getPageDelay(alias, prevPage) // 800
  const changeShow = (flag) => {
    if (flag) {
      setShow(true)
      clearTimeout(tid2)
      tid1 = setTimeout(() => {
        setShowBox(true)
      }, 0)
    } else {
      // const children = document.querySelectorAll('.zero-page .line-block')
      // const delay = 1000 // 500 * ((children.length || 7) + 1)
      setShowBox(false)
      clearTimeout(tid1)
      tid2 = setTimeout(() => {
        setShow(false)
      }, delay)
    }
  }
  const toLocal1 = (alias, prevPage = '') => {
    dispatch({
      type: 'localData/changeName',
      payload: {
        animateName: getAnimateName(alias, prevPage) // /^local/g.test(alias) && alias !== 'local1' ? 'two' : 'body',
      }
    })
  }
  const watchPage = () => {
    if (view && !prevView) {
      changePage({ page, alias })
    }
    if (page && !prevPage) {
      toLocal1(alias, prevPage)
    }
    // useEffect(() => {
      if (alias && prevPage && showBox) {
        const cb = () => {
          if(/^ local /.test(prevPage) && alias === 'home') {
            delay = 1400;

            changePage({ needRight: true, animateName: 'two' });
            clearTimeout(tidPageBefore);
            tidPageBefore = setTimeout(() => {
              changePage({ needRight: false, animateName: 'body' });
            }, delay - 100);
          } else {
            toLocal1(alias, prevPage);
          }
          if (isLocal(prevPage) && !isLocal(alias)) {
            delay = 1400;
          }

          changeShow(false);
          changePage({ nextPage: alias });
          console.log(`页面等待时间: ${delay}`)
          clearTimeout(tidPage)
          tidPage = setTimeout(() => {
            changePage({ page, alias, prevPage });
            changeShow(true);
          }, delay);
        }
        const hasChanged = alias !== prevPage
        const hasNoEndTransition = !hasChanged && alias !== localData.nextPage
        if (hasChanged || hasNoEndTransition) {
          cb()
        }
      }
    // }, [page, alias, prevPage, localData])
  }
  const onShow = () => changeShow(true)
  const onHide = () => changeShow(false)

  const onKeydown = (event) => {
    // 2: 50
    // 0: 48
    if (event.keyCode === 50 || event.keyCode === 48) {
      changeShow(false)
    }

    if (event.keyCode /* 1 */ === 49) {
      changeShow(true)
    }
  }

  const initUE4Event = () => {
    document.addEventListener('Show', onShow)
    document.addEventListener('Hide', onHide)
  }
  const initEvent = () => {
    if (isUe4) {
      // changeShow(true)
      if (window.AlipayJSBridge) {
        initEvent()
      } else {
        document.addEventListener('AlipayJSBridgeReady', initUE4Event, false)
      }
    } else {
      toLocal1(alias)
      changeShow(true)
      
      window.addEventListener('keydown', onKeydown, false)
    }
    // window.addEventListener('resize', setSize)
  }

  const removeEvent = () => {
    if (isUe4) {
      document.removeEventListener('Show', onShow)
      document.removeEventListener('Hide', onHide)
    } else {
      window.removeEventListener('keydown', onKeydown, false)
    }
    // window.removeEventListener('resize', setSize)
  }

  // const scale1 = width / 2196
  // const scale = `scale(${isDev ? (fit ? scale1 : 1) : scale1})`

  useEffect(() => {
    initEvent()
    document.querySelector("#root").className = "first-page"
    return removeEvent
  }, [])
  watchPage()

  // const scale = 1;
  return {
    show,
    showBox,
    // scale,
  }
}
