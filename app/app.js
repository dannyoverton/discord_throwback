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

    

    if (primaryCommand == "clean") {
        cleanCommand(arguments, receivedMessage)
    } else if (primaryCommand == "multiply") {
        multiplyCommand(arguments, receivedMessage)
    } else if (primaryCommand == "throwback") {
        throwbackCommand(arguments, receivedMessage)
    } else {
        return
    }
}





function cleanCommand(arguments, receivedMessage) {
    
    function clean(limit = 100) {
        return receivedMessage.channel.fetchMessages({limit}).then(async collected => {
          let mine = collected.filter(m => m.content.startsWith("!")); // this gets only your messages
          if (mine.size > 0) {
            await receivedMessage.channel.bulkDelete(mine, true);
            clean(receivedMessage.channel);
          } else receivedMessage.channel.send("The channel is now empty!").delete(5000); // this message is deleted after 5 s
        });
      }

    function cleanBot(limit = 100) {
        return receivedMessage.channel.fetchMessages({limit}).then(async collected => {
            let mine = collected.filter(m => m.author.id == "554916310212149251"); // this gets only your messages
            if (mine.size > 0) {
                await receivedMessage.channel.bulkDelete(mine, true);
                clean(receivedMessage.channel);
            } else receivedMessage.channel.send("The channel is now empty!").delete(5000); // this message is deleted after 5 s
        });
      }   


    if (arguments == "bot") {
        cleanBot();
    } else {
        clean();
    }
}








var bigArray;
var testArray;

function throwbackCommand(arguments, receivedMessage){
    var id = receivedMessage.member.id; // Code for getting ID of person who activates
    var user = receivedMessage.guild.members.random(); //Code for getting random user from server
    var userId = (`${user.user}`);
    var otherUserId = user.user.id
    var throwbackChannel = client.channels.get("555605025917894657")
    
    
    if (receivedMessage.author.id === id) {
        receivedMessage.delete(10000)
    }


    // console.log(otherUserId)
    // console.log(userId);
    
    
    async function lots_of_messages_getter(limit = 1000) {
        sum_messages = [];
        let last_id;
        
    
        while (true) {
            const options = { limit: 100 };
            if (last_id) {
                options.before = last_id;
            }
    
            const messages = await receivedMessage.channel.fetchMessages(options);
            sum_messages.push(messages.array());
            last_id = messages.last().id;
    
            if (messages.size != 100 || sum_messages >= limit) {
                break;
            }
        }
        
        //sum_messages.filter(msg => msg.author.id === id);
        let rArray = sum_messages[Math.floor(Math.random() * sum_messages.length)]
        //let big_array_user = big_array.filter(msg => msg.author.id === id)
        let rMessage = rArray[Math.floor(Math.random() * rArray.length)]
        let rUser = rMessage.author.username;
        let rContent = rMessage.content;
        let rChannel = rMessage.channel.name;
        let rMessageTime = new Date(rMessage.createdTimestamp).toDateString()
        let currentTime = new Date.now()
        
        console.log(currentTime)
        console.log(rContent)
        console.log(rMessage)
        
        console.log(sum_messages.length)
        console.log(rArray.length)
        

        throwbackChannel.send({embed: {
            color: 3447003,
            author: {
                name: "Throwback of " + rUser,
                icon_url: rMessage.author.avatarURL
            },
            
            title: "Throwback to when " + rUser + " sent this on " + rMessageTime + " in (" + rChannel + ")",
            
            //title: rUser + " sent this: " + rMessageTime + " in (" + rChannel + ")",
            //description: rContent,
            timestamp: Date.now().toDateString(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "This throwback was requested by " + receivedMessage.author.username + " at "
            }
          }
        });
        throwbackChannel.send("-------------------------THROWBACK BELOW-------------------------")
        throwbackChannel.send(rContent)
        return sum_messages;
    }

    




    async function messagesBigList() {
        

        receivedMessage.channel.fetchMessages({ limit: 100 }).then(msg => {
            let toBeArray = msg;
            let firstLastPost = (toBeArray.last().id)
            receivedMessage.channel.fetchMessages({ limit: 100, before: firstLastPost }).then(msg => {
                let secondToBeArray = msg;
                let secondLastPost = secondToBeArray.last().id;
                receivedMessage.channel.fetchMessages({ limit: 100, before: secondLastPost }).then(msg => {
                    let thirdArray = msg;
                    let thirdLastPost = thirdArray.last().id;
                    receivedMessage.channel.fetchMessages({ limit: 100, before: thirdLastPost }).then(msg => {
                        let fourthArray = msg;
                        fetchedPerson = msg.filter(message => message.author.id === id).array()
                        randMessage = fetchedPerson[Math.floor(Math.random() * fetchedPerson.length)]
                        randMessageContent = randMessage.content;
                        randMessageTime = new Date(randMessage.createdTimestamp).toDateString()
                        console.log(randMessageContent)
                        console.log(randMessageTime)
                        console.log(randMessage.author.username)


                        receivedMessage.channel.send("Give it like 30 seconds then check the `throwback` channel for the response")
                        throwbackChannel.send(randMessage.author.username + " sent this message on: " + randMessageTime + "\n" + randMessageContent)
                    })

                })


            })



        }).catch((err) => receivedMessage.channel.send(user.user.username + " is a bitch and didn't send any messages recently, sorry!"))

        //receivedMessage.channel.fetchMessages({limit: 100, before: firstArray.last().message.id }) 
        //console.log(secondArray.last().message.id)

    }


    

    function getBigArray() {
        console.log(bigArray.filter(message => message.author.id === id).array())
        
    }




    if (arguments.length > 10 ) {
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
        //getBigArray();
        
        

    } else if (arguments == "test") {
        console.log(sum_messages)
        


    } else if (arguments == "random") {
        receivedMessage.channel.send("Give it like 30 seconds then check the `throwback` channel for the response")
        lots_of_messages_getter();
        

        
    } else {
        receivedMessage.channel.send("Give it like 30 seconds then check the `throwback` channel for the response").then(msg => msg.delete(10000))
        lots_of_messages_getter();
        

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

