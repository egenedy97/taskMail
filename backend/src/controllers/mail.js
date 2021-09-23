

const sendEmail = async(req,res)=>{
try{
    const data = req.body ; 
    console.log(data)
    const mailjet =await require ('node-mailjet').connect('3acd3742a7dd583028a824fd42593ac8', '399dcc145db18bb308ca6e41ed165562')
    const request = mailjet.post("send", {'version': 'v3.1'}).request({
      "Messages":[
        {
          "From": {
            "Email": "eslamgenedy@outlook.com",
            "Name": "re"
          },
          "To": 
            [...data.to]
          ,
          "Subject": data.Subject,
          "TextPart": data.textPart,
          "HTMLPart": data.HTMLPart,
          "CustomID": "AppGettingStartedTest"
        }
      ]
    })
    request
      .then((result) => {
        console.log(result.body)
      })
      .catch((err) => {
        console.log(err)
      })
    
    res.status(200).send('Message is send') ; 
    console.log('Message is Sent')
}catch(e)
{
    res.status(400).send('there is an error in mailjet') ; 
    console.log(e)
}

}

module.exports={sendEmail}