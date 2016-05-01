import os
import urllib.request

if __name__ == '__main__':
	for i in range(1,1000):
		filename = "res/levels/level" + str(i) + ".json"
		url ="http://szhong.4399.com/4399swf/upload_swf/ftp16/ssj/20150703/j4/1y/" +filename
		try:
			f = urllib.request.urlopen(url)
			data = f.read()
			with open(filename,'wb') as code:
				code.write(data)
				code.close()
		except Exception as e:
			print(e)
			break
				

			
