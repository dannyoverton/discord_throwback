const Discord = require('discord.js')
const client = new Discord.Client()


// Enviornment variables using dotenv
require('dotenv').config();
discord_bot_auth = process.env.BOT_SECRET_TOKEN



client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }
    
    if (receivedMessage.content.startsWith("!")) {
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    if (primaryCommand == "help") {
        helpCommand(arguments, receivedMessage)
    } else if (primaryCommand == "multiply") {
        multiplyCommand(arguments, receivedMessage)
    } else if (primaryCommand == "throwback") {
        throwbackCommand(arguments, receivedMessage)
    } else {
        return
    }
}

function helpCommand(arguments, receivedMessage) {
    if (arguments.length > 0) {
        receivedMessage.channel.send("It looks like you might need help with " + arguments + ". TOO DAMN BAD GOOGLE IT.")
    } else {
        
    }
}



function throwbackCommand(arguments, receivedMessage){
    var id = receivedMessage.member.id; // Code for getting ID of person who activates
    var user = receivedMessage.guild.members.random(); //Code for getting random user from server
    var userId = (`${user.user}`);
    var otherUserId = user.user.id
    console.log(otherUserId)
    console.log(userId);
    


    async function messagesBigList(){
        
        
        receivedMessage.channel.fetchMessages({limit: 100}).then(msg => {
            let toBeArray = msg;
            let firstLastPost = (toBeArray.last().id)
            receivedMessage.channel.fetchMessages({limit: 100, before: firstLastPost }).then(msg => {
                let secondToBeArray = msg;
                let secondLastPost = secondToBeArray.last().id;
                receivedMessage.channel.fetchMessages({limit: 100, before: secondLastPost }).then(msg => {
                    let thirdArray = msg;
                    let thirdLastPost = thirdArray.last().id;
                    receivedMessage.channel.fetchMessages({limit: 100, before: thirdLastPost }).then(msg => {
                        let fourthArray = msg;
                        fetchedPerson = msg.filter(message => message.author.id === id).array()
                        randMessage = fetchedPerson[Math.floor(Math.random() * fetchedPerson.length)]
                        randMessageContent = randMessage.content;
                        randMessageTime = new Date(randMessage.createdTimestamp).toDateString()
                        console.log(randMessageContent)
                        console.log(fourthArray.last().createdTimestamp)
                        console.log(fourthArray.last().author.username)
                        
                        

                        receivedMessage.channel.send(randMessage.author.username + " sent this message on: " + randMessageTime + "\n" + randMessageContent)
                    })
                    
                })
                
                
            })

            
                
        })

        //receivedMessage.channel.fetchMessages({limit: 100, before: firstArray.last().message.id }) 
        //console.log(secondArray.last().message.id)
          
    }


    if (arguments.length > 2 ) {
        receivedMessage.channel.send("Just use `!throwback me`")
    } else if (arguments == "outdatedme") {
        receivedMessage.channel.fetchMessages({ limit: 100 }).then(message => {
            const fetched = message.filter(msg => msg.author.id === id)
            fetchedArray = fetched.array();
            randomMessage = fetchedArray[Math.floor(Math.random() * fetchedArray.length)]
            const finalMessageContent = (randomMessage.content)
            const finalMessageTime = new Date(randomMessage.createdTimestamp).toDateString()

            receivedMessage.channel.send(receivedMessage.member.user.username + " sent this message on: " + finalMessageTime + "\n" + finalMessageContent)
    })

    } else if (arguments == "me") {
        messagesBigList();
        
        

    } else {
        

    

    receivedMessage.channel.fetchMessages({limit: 100}).then(message => {
        const fetched = message.filter(msg => msg.author.id === otherUserId)
        //console.log(fetched)
        fetchedArray = fetched.array();
        randomMessage = fetchedArray[Math.floor(Math.random() * fetchedArray.length)]
        const finalMessageContent = (randomMessage.content)
        const finalMessageTime = new Date(randomMessage.createdTimestamp).toDateString()

        receivedMessage.channel.send(user.user.username + " sent this message on: " + finalMessageTime + "\n" + finalMessageContent)
        
    })
    .catch((err) => receivedMessage.channel.send(user.user.username + " is a bitch and didn't send any messages recently, sorry!"))


    }




}    
    //.then(messages => fetchedMsgs = (`${messages.last().content}`)) // Solved using https://stackoverflow.com/questions/54856916/log-all-messages-from-a-channel/54858351#54858351
    
    

    //* THIS IS CODE TO USE .get METHOD. THIS IS DOABLE BECAUSE .fetchMessages RETURNS A COLLECTION WHICH IS COMPARABLE TO A MAP *//
    // const getContent = receivedMessage.channel.fetchMessages({limit: 5}).then(messages => console.log(messages.get(content)))
    // return getContent





    // const collector = new Discord.MessageCollector(receivedMessage, m => m.author.id === userId)
    // console.log(collector)
    
    // ranUserMsgs = receivedMessage.channel.fetchMessages({ limit: 50 });
    // console.log(ranUserMsgs)






//     async function findMessage() {
//         let ranUserMsgs = await receivedMessage.channel.fetchMessages({ limit: 50 });
//         let ranMsg = await ranUserMsgs.content;
//         console.log(ranMsg)
//     }
// findMessage();
    



   
    // console.log(id)
    // receivedMessage.channel.fetchMessages({around: id, limit: 1}).then(messages => {
    //     const fetchedMsg = messages.first();
    //     console.log(fetchedMsg)
    //})




client.login(discord_bot_auth)

