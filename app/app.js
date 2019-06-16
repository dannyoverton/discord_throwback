const Discord = require('discord.js')
const client = new Discord.Client()
const moment = require('moment') // Using moment.js to get current time for timestamp


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
    } else if (primaryCommand == "help") {
        helpCommand(arguments, receivedMessage)
    } else if (primaryCommand == "throwback") {
        throwbackCommand(arguments, receivedMessage)
    } else {
        return
    }
}



function helpCommand(arguments, receivedMessage) {
    if (arguments == "help") {
        receivedMessage.channel.send({
            embed: {
                color: 14177041,
                author: {
                    name: "How to use the Throwback bot:",
                    icon_url: client.user.avatarURL,
                },
                fields: [{
                        name: "How to use:",
                        value: (`1) Go to the channel that you want to get a post from and type !throwback
                    2) Wait a little bit (the more posts on the channel the longer it takes)
                    3) Go to the "Throwback" channel where the throwback message was posted`.trim())
                    },
                    {
                        name: "Command List",
                        value: (`**__!throwback__** - Retrieves a completely random message from channel
                    **__!throwback me__** - Retrieves one of your messages from the channel
                    **__!throwback vid__** - Gets a random posted video from the channel
                    **__!throwback convo__** - Gets a group of posts from the channel`)
                    }

                ]
            }
        });
    } else {
        receivedMessage.channel.send("I'm not sure what you need help with. Try `!help [topic]`")
    }
}




function cleanCommand(arguments, receivedMessage) {

    function clean(limit = 100) {
        return receivedMessage.channel.fetchMessages({
                limit
            }).then(async collected => {
                let mine = collected.filter(m => m.content.startsWith("!")); // this gets only your messages
                if (mine.size > 0) {
                    await receivedMessage.channel.bulkDelete(mine, true);
                    receivedMessage.channel.send("All `!command` messages deleted").then(msg => msg.delete(5000));
                    //clean(receivedMessage.channel);
                } else receivedMessage.channel.send("The channel is now empty!").then(msg => msg.delete(5000)); // this message is deleted after 5 s
            })
            .catch((err) => console.log(err));
    }

    function cleanBot(limit = 100) {
        return receivedMessage.channel.fetchMessages({
                limit
            }).then(async collected => {
                let mine = collected.filter(m => m.author.id == "554916310212149251"); // this gets only your messages
                if (mine.size > 0) {
                    await receivedMessage.channel.bulkDelete(mine, true);
                    //clean(receivedMessage.channel);
                } else receivedMessage.channel.send("The channel is now empty of my posts!").then(msg => msg.delete(5000)); // this message is deleted after 5 s
            })
            .catch((err) => console.log(err));
    }

    function cleanAll(limit = 100) {
        return receivedMessage.channel.fetchMessages({
                limit
            }).then(async collected => {
                let mine = collected;
                if (mine.size > 0) {
                    await receivedMessage.channel.bulkDelete(mine, true);
                    //clean(receivedMessage.channel);
                } else receivedMessage.channel.send("The channel is now empty!").then(msg => msg.delete(5000)); // this message is deleted after 5 s
            })
            .catch((err) => console.log(err));
    }


    if (arguments == "bot") {
        cleanBot();
    } else if (arguments == "all") {
        cleanAll();
    } else if (arguments == "") {
        clean();
    } else {
        receivedMessage.channel.send("Try a command, bitch.")
    }
}




function throwbackCommand(arguments, receivedMessage) {
    var id = receivedMessage.member.id; // Code for getting ID of person who activates
    var throwbackChannel = client.channels.get("555605025917894657")
    var generalChannel = client.channels.get("164580034269413376")

    if (receivedMessage.author.id === id) {
        receivedMessage.delete(10000)
    }

    // Loop from my stackoverflow question that iterates through multiple arrays using an element from previous array
    async function lots_of_messages_getter(limit = 1000) {                              // Create async function
        sum_messages = [];                                                              // Create sum_messages as empty array
        let last_id;                                                                    // Create var to hold id of last message of array

        
        while (true) {                                                                  // Start loop, with True boolean loop will continue until we add a break
            const options = {                                                           // Creating an options object
                limit: 100
            };                                                                          // End object creation
            if (last_id) {                                                              // Create first condition
                options.before = last_id;                                               // Here we say if last_id exists, append its value to options object
            }

            const messages = await receivedMessage.channel.fetchMessages(options);      // Set up fetching the messages, pass it the options object which holds our arguments
            sum_messages.push(...messages.array());                                     // Here we use a "Spread Operator" for an array literal and push the messages array to sum_messages
            last_id = messages.last().id;                                               // Thanks to hoisting (I think) we can assign last_id here and use it in the previous if statement

            if (messages.size != 100 || sum_messages >= limit) {                        // This is our break function stating if our original array is less that 100 it will exit to prevent errors    
                break;                                                                  // and if sum_messages reaches our limit it will end, otherwise it will loop until it reaches an end and break
            }
        }



        return sum_messages;                                                            // Here we return sum_messages, allowing us to use the data in other functions
    }



    if (arguments == "help") {
        receivedMessage.channel.send({
            embed: {
                color: 14177041,
                author: {
                    name: "How to use the Throwback bot:",
                    icon_url: client.user.avatarURL,
                },
                fields: [{
                        name: "How to use:",
                        value: (`1) Go to the channel that you want to get a post from and type !throwback
                    2) Wait a little bit (the more posts on the channel the longer it takes)
                    3) Go to the "Throwback" channel where the throwback message was posted`.trim())
                    },
                    {
                        name: "Command List",
                        value: (`**__!throwback__** - Retrieves a completely random message from channel
                    **__!throwback me__** - Retrieves one of your messages from the channel
                    **__!throwback vid__** - Gets a random posted video from the channel
                    **__!throwback convo__** - Gets a group of posts from the channel`)
                    }

                ]
            }
        });

    } else if (arguments == "me") {
        receivedMessage.channel.send("Give it like 30 seconds then check the `throwback` channel for the response").then(msg => msg.delete(10000))
        lots_of_messages_getter().then(msgs => {
            sum_messages = msgs;
            sum_messages = sum_messages.filter(msg => msg.author.id === id);
            let rMessage = sum_messages[Math.floor(Math.random() * sum_messages.length)]
            let rUser = rMessage.author.username;
            let rContent = rMessage.content;
            let rEmbed = (rMessage.attachments.length > 0) ? rMessage.attachments.first().url : false
            let rChannel = rMessage.channel.name;
            let rMessageTime = new Date(rMessage.createdTimestamp).toDateString();

            // Start of Embed
            throwbackChannel.send({
                embed: {
                    color: 14177041,
                    author: {
                        name: "Throwback to when " + rUser + " sent this on " + rMessageTime + " in (" + rChannel + ")",
                        icon_url: rMessage.author.avatarURL
                    },
                    timestamp: moment(),
                    footer: {

                        text: "This throwback was requested by " + receivedMessage.author.username + " at "
                    }
                }
            });

            // Formatting for throwback starts here
            throwbackChannel.send(rUser + ": \n" + ((rEmbed.length >= 0) ? rEmbed : rContent))

            // Endding embed
            throwbackChannel.send({
                embed: {
                    color: 14177041,
                    timestamp: moment(),
                    footer: {

                        text: "End of Throwback"
                    }
                }
            });

        }).catch(err => (console.log(err)))


    } else if (arguments == "vid") {
        receivedMessage.channel.send("Give it like 30 seconds then check the `throwback` channel for the response").then(msg => msg.delete(10000))
        lots_of_messages_getter().then(msgs => {
            sum_messages = msgs;
            sum_messages = sum_messages.filter(msg => msg.content.startsWith('https://www.youtube.com/watch'));
            let rMessage = sum_messages[Math.floor(Math.random() * sum_messages.length)]
            let rUser = rMessage.author.username;
            let rContent = rMessage.content;
            let rEmbed = (rMessage.attachments.length >= 0) ? rMessage.attachments.first().url : false
            let rChannel = rMessage.channel.name;
            let rMessageTime = new Date(rMessage.createdTimestamp).toDateString();

            // Start of Embed
            throwbackChannel.send({
                embed: {
                    color: 14177041,
                    author: {
                        name: "Throwback to when " + rUser + " sent this on " + rMessageTime + " in (" + rChannel + ")",
                        icon_url: rMessage.author.avatarURL
                    },
                    timestamp: moment(),
                    footer: {

                        text: "This throwback was requested by " + receivedMessage.author.username + " at "
                    }
                }
            });

            // Formatting for throwback starts here
            throwbackChannel.send(rUser + ": \n" + ((rEmbed.length >= 0) ? rEmbed : rContent))

            // Endding embed
            throwbackChannel.send({
                embed: {
                    color: 14177041,
                    timestamp: moment(),
                    footer: {

                        text: "End of Throwback"
                    }
                }
            });


        }).catch(err => (console.log(err)))


    } else if (arguments == "convo") {
        receivedMessage.channel.send("Give it like 30 seconds then check the `throwback` channel for the response").then(msg => msg.delete(10000))
        lots_of_messages_getter().then(msgs => {
            sum_messages = msgs;
            let rMessage = sum_messages[Math.floor(Math.random() * sum_messages.length)]
            let rUser = rMessage.author.username;
            let rContent = rMessage.content;
            let rEmbed = (rMessage.attachments.length >= 0) ? rMessage.attachments.first().url : false //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
            let rChannel = rMessage.channel.name;
            let rMessageTime = new Date(rMessage.createdTimestamp).toDateString();
            let rIndex = sum_messages.indexOf(rMessage)
            let rConvo = sum_messages.slice(rIndex - 3, rIndex + 3)
            console.log(rIndex)
            console.log(rConvo.length)
            // for (let i = rConvo.length - 1; i >= 0; i--) { //https://stackoverflow.com/questions/9379489/looping-through-the-elements-in-an-array-backwards
            //     console.log(rConvo[i].author.username + ": \n" +rConvo[i].content)
            // }

            // Start of Embed
            throwbackChannel.send({
                embed: {
                    color: 14177041,
                    author: {
                        name: "Throwback to a conversation on " + rMessageTime + " in #" + rChannel,
                        icon_url: rMessage.author.avatarURL
                    },
                    timestamp: moment(),
                    footer: {

                        text: "This throwback was requested by " + receivedMessage.author.username + " at "
                    }
                }
            });

            // Formatting for throwback starts here
            for (let i = rConvo.length - 1; i >= 0; i--) { //https://stackoverflow.com/questions/9379489/looping-through-the-elements-in-an-array-backwards
                throwbackChannel.send(rConvo[i].author.username + " (" + moment(rConvo[i].createdTimestamp).format("MM/DD/YYYY h:mm a") + ")" + ": \n" + rConvo[i].content + '\n' + '\n')
            };

            throwbackChannel.send({
                embed: {
                    color: 14177041,
                    timestamp: moment(),
                    footer: {

                        text: "End of Throwback"
                    }
                }
            });


        }).catch(err => (console.log(err)))






    } else if (arguments == "") {
        receivedMessage.channel.send("Give it like 30 seconds then check the `throwback` channel for the response").then(msg => msg.delete(10000))
        lots_of_messages_getter().then(msgs => {
            sum_messages = msgs;
            let rMessage = sum_messages[Math.floor(Math.random() * sum_messages.length)]
            let rUser = rMessage.author.username;
            let rContent = rMessage.content;
            let rEmbed = (rMessage.attachments.length >= 0) ? rMessage.attachments.first().url : false //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
            let rChannel = rMessage.channel.name;
            let rMessageTime = new Date(rMessage.createdTimestamp).toDateString();


            // Start of Embed
            throwbackChannel.send({
                embed: {
                    color: 14177041,
                    author: {
                        name: "Throwback to when " + rUser + " sent this on " + rMessageTime + " in (" + rChannel + ")",
                        icon_url: rMessage.author.avatarURL
                    },
                    timestamp: moment(),
                    footer: {

                        text: "This throwback was requested by " + receivedMessage.author.username + " at "
                    }
                }
            });

            // Formatting for throwback starts here
            throwbackChannel.send(rUser + ": \n" + ((rEmbed.length >= 0) ? rEmbed : rContent))

            // Endding embed
            throwbackChannel.send({
                embed: {
                    color: 14177041,
                    timestamp: moment(),
                    footer: {

                        text: "End of Throwback"
                    }
                }
            });

        }).catch(err => (console.log(err)))







    } else if (arguments == "start") {
        receivedMessage.channel.send("One throwback post will be posted to the #throwback channel every 24 hours at this exact time or until I crash.").then(msg => msg.delete(10000))
        var interval = setInterval(() => {
            lots_of_messages_getter().then(msgs => {
                sum_messages = msgs;
                sum_messages = sum_messages.filter(msg => msg.content.startsWith('https://www.youtube.com/watch'));
                let rMessage = sum_messages[Math.floor(Math.random() * sum_messages.length)]
                let rUser = rMessage.author.username;
                let rContent = rMessage.content;
                let rEmbed = (rMessage.attachments.length >= 0) ? rMessage.attachments.first().url : false
                let rChannel = rMessage.channel.name;
                let rMessageTime = new Date(rMessage.createdTimestamp).toDateString();

                // Start of Embed
                generalChannel.send({
                    embed: {
                        color: 14177041,
                        author: {
                            name: "Throwback to when " + rUser + " sent this on " + rMessageTime + " in (" + rChannel + ")",
                            icon_url: rMessage.author.avatarURL
                        },
                        timestamp: moment(),
                        footer: {

                            text: "This throwback was requested by " + receivedMessage.author.username + " at "
                        }
                    }
                });

                // Formatting for throwback starts here
                generalChannel.send(rUser + ": \n" + ((rEmbed.length >= 0) ? rEmbed : rContent))

                // Endding embed
                generalChannel.send({
                    embed: {
                        color: 14177041,
                        timestamp: moment(),
                        footer: {

                            text: "End of Throwback"
                        }
                    }
                });
            }).catch(err => (console.log(err)))


        }, 24 * 3600000)


    } else {
        receivedMessage.channel.send({
            embed: {
                color: 14177041,
                author: {
                    name: "Throwback Boot",
                    icon_url: client.user.avatarURL,
                },
                fields: [{
                    name: `The commands are:`,
                    value: (` 
                    !throwback
                    !throwback me
                    !throwback vid
                    !throwback convo
                    *For more info use !throwback help`).trim()
                }],
            }
        });
    }


}

// ----------REFRENCES----------
//.then(messages => fetchedMsgs = (`${messages.last().content}`)) // Solved using https://stackoverflow.com/questions/54856916/log-all-messages-from-a-channel/54858351#54858351

//* THIS IS CODE TO USE .get METHOD. THIS IS DOABLE BECAUSE .fetchMessages RETURNS A COLLECTION WHICH IS COMPARABLE TO A MAP *//
// const getContent = receivedMessage.channel.fetchMessages({limit: 5}).then(messages => console.log(messages.get(content)))
// return getContent





client.login(discord_bot_auth)