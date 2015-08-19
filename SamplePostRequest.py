import requests
import json

def Post(endpoint,data):
	url = 'https://partner.inkling.com'
	partnerKey = '?access_token=p-970d21fbdd8540e99bd7b23ffb9e0af1'
	req = requests.post(url + endpoint + partnerKey, data=data)
	
	# This is how you can get the header information from a build call. 
	reqHeader = req.headers['location']
	print reqHeader
	return json.loads(req.text)

def Get(endpoint, s9ID):
	url = 'https://partner.inkling.com'
	partnerKey = '?access_token=p-970d21fbdd8540e99bd7b23ffb9e0af1'
	req = requests.get(url + endpoint + '/' + s9ID + partnerKey)
	return json.loads(req.text)

data = {
'shortname':'sn_b2c2',
'type':'epub'
}

s9ID = '082df23d7c79961406ba9ce12ce2d448806'

'''
# Make POST call
data = json.dumps(data)
result = Post('/contentbuilds', data)
print result
'''

# Make GET call
result = Get('/contentbuilds', s9ID)
print result



