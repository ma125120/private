import dayjs from 'dayjs'

export const getVaildDate = (item) => dayjs(item.overTime).isAfter(dayjs())

export const getInvaildDate = (item) => dayjs().isAfter(dayjs(item.overTime))

function format(s, c) {
  return s.replace(/{(\w+)}/g,
    function(m, p) {
      return c[p];
    }
  );
}

function download(url, name = '1.xlsx') {
  console.log(url);
  return;
  let a = document.createElement('a');
  a.href = url;
  a.setAttribute('download', name)
  a.click();
}
function exportExcel(res = `<th><td>1</td><td>2</td></th>`) {
  var uri = 'data:application/vnd.ms-excel;base64,',
	template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
	<head>
		<!--[if gte mso 9]>
			<xml>
				<x:ExcelWorkbook>
					<x:ExcelWorksheets>
						<x:ExcelWorksheet>
							<x:Name>{worksheet}</x:Name>
							<x:WorksheetOptions>
								<x:DisplayGridlines/>
							</x:WorksheetOptions>
						</x:ExcelWorksheet>
					</x:ExcelWorksheets>
				</x:ExcelWorkbook>
			</xml>
		<![endif]-->
		<style type="text/css">
			table td {
				text-align: center;
			};
			.header{
				background-color:'gray'
			}
			.align-left {text-align: left !important;}
			.align-right {text-align: right !important;}
			.align-center {text-align: center !important;}
		</style>
	</head>
		<body>
			<table>${res}</table>
		</body>
  </html>`;
  console.log(template)
  var ctx = { worksheet: 'aaaa' || 'Worksheet', table: res };
  var blob = new Blob([template], { type: "application/octet-stream" });
  download(URL.createObjectURL(blob))
}
