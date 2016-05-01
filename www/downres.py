import os
import urllib.request

if __name__ == '__main__':
	fileobj = open("res.txt")
	lines = fileobj.readlines() #读取所有行
	for line in lines:
		#print(line)
		#
		line = line.strip()
		a,b=os.path.split(line)
		if(os.path.exists(a)):
			pass
		else:
			os.makedirs(a)
		try:
			url = "http://szhong.4399.com/4399swf/upload_swf/ftp16/ssj/20150703/j4/1y/"+line
			f = urllib.request.urlopen(url)
			data = f.read()
			with open(line,'wb') as code:
				code.write(data)
				code.close()
		except Exception as e:
			print (url)

		for i in xrange(1,1000):
			filename = "res/Levels/" + i + ".json"
			url ="http://szhong.4399.com/4399swf/upload_swf/ftp16/ssj/20150703/j4/1y/" +filename
			try:
				f = urllib.request.urlopen(url)
			data = f.read()
			with open(line,'wb') as code:
				code.write(data)
				code.close()
			except Exception, e:
				break
				

			

