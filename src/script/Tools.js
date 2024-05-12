/**
 * 静态方法工具类
 */
class Tools {

	static replaceInfoImg(info) {
		if (!info) {
			return info;
		}
		// 正则表达式匹配<img开始的所有标签，但不包括>  
		const regex = /<img([^>]*)>/g;
		let style = 'display: block;max-width: 90vw;height: auto;margin: 10px auto;'

		let replacedString = info.replace(regex, function(match, p1) {
			// p1是匹配到的第一个分组，即<img标签的所有属性  
			// 在属性前插入style属性  
			return `<img style="${style}"${p1 ? ' ' + p1 : ''}>`;
		});
		replacedString = replacedString.replace(/\r\n/g, "<br>")
		replacedString = replacedString.replace(/\n/g, "<br>")
		replacedString = replacedString.replace(/\r/g, "<br>")
		return replacedString
	}

	/**
	 * 合并多个json对象
	 * @param jsons 要合并的多个json
	 * @returns 合并后的json对象
	 */
	static concatJson(...jsons) {
		let json = {}
		for (let index = 0; index < jsons.length; index++) {
			let element = jsons[index]
			for (let key in element) {
				json[key] = element[key]
			}
		}
		return json
	}

	/**
	 * 格式化日期
	 * @param value 时间对象，可以时Date或者时间戳
	 * @param format 格式化字符串
	 * @returns 格式化日期之后的结果
	 */
	static formatDate(value, format = 'yyyy-MM-dd hh:mm:ss') {
		try {
			let time = new Date()
			if (typeof value === 'number') {
				time.setTime(parseInt(value.toString()))
			} else if (value instanceof Date) {
				time = value
			}
			let year = time.getFullYear() + ''
			let month = time.getMonth() + 1 + ''
			let day = time.getDate() + ''
			let hour = time.getHours() + ''
			let minute = time.getMinutes() + ''
			let second = time.getSeconds() + ''
			let ms = time.getMilliseconds() + ''
			month = month.padStart(2, '0')
			day = day.padStart(2, '0')
			hour = hour.padStart(2, '0')
			minute = minute.padStart(2, '0')
			second = second.padStart(2, '0')
			ms = ms.padStart(3, '0')

			format = format.replace(/yyyy/g, year)
			format = format.replace(/MM/g, month)
			format = format.replace(/dd/g, day)
			format = format.replace(/hh/g, hour)
			format = format.replace(/mm/g, minute)
			format = format.replace(/ss/g, second)
			format = format.replace(/ms/g, ms)
			return format
		} catch (ex) {
			console.error(ex)
			return ''
		}
	}

	/**
	 * 将文字信息复制到剪贴板
	 * @param text 要复制的文本
	 */
	static async copyText(text) {
		// 剪贴板对象的实现方式（更新和更好的方式，但是需要浏览器授权）
		try {
			await navigator.clipboard.writeText(text)
			console.log('复制完成0')
			return
		} catch (ex) {
			console.error(ex)
		}
		// 原始的，不支持剪贴板对象的实现方式
		// 创建输入框并设置内容
		let input = document.createElement('input')
		input.value = text
		// 放到页面上
		document.body.appendChild(input)
		// 选中文本框中的内容
		input.focus()
		input.select()
		input.setSelectionRange(0, text.length)
		// 调用浏览器的复制指令
		document.execCommand('Copy')
		// 移除input
		document.body.removeChild(input)
		console.log('复制完成1')
	}
}


export default Tools
export {
	Tools as Tools
}