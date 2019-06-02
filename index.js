

const Commando = require('discord.js-commando');
const talkedRecently = new Set();

const roblox = require('noblox.js')
const Discord = require('discord.js')
const client = new Discord.Client();
var token = "NTY5ODcyMzk5MzQwOTI5MDI0.XNS34w.yvRyJd8cLPtKcdAvUcyZGuApt78";

client.login(token)

var cookie = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_3031A5DB42E65CF76DE71F88DEDDF4E0A6C8940D10DCBF7CDB3C7EF9CC9B8C52F3F86A37EC90A58742513833EF969835F2C0B67FD4352574F0CCFBE452DDD462B18F5F58F20DA790D2396F66D7FDC455C682B4C769BE885D81EABD6651DF34CB96C4280CC2C3B87AC2F6A542DA5DD9536B58964870CF1AA3F1E9101B190E0FBA396147C5497A4C3E34C5FB8DD97C9763376ADE6A5FECCD3C5FEFA3855FAA26333322C0AEDF5CD19DAD91976DBFCDB91DC110EB28133AEB05AF138DE0AE0DEC39667B074BCAFB3C896B04FED076A45426B1A61D67C468EC8B07A84A1164ACA6FAF9525070B7880E11043BD38E6C0786FF49456870E668FC28E2E38E49A04880644563276AC48165AB941A1AF1E2AB80C3300146C4EE11E3548E14E93F205B04F31A90F6614C0425CA137C470C3DF020705B2388642EA78B5CAD545EBC1E9E52C649B2EBBE";

var prefix = '#';
var groupId = 4748808;
var maximumRank = 255;

function login() {
    return roblox.cookieLogin(cookie);
}

login() // Log into ROBLOX
    .then(function() { // After the function has been executed
        console.log('Logged in.') // Log to the console that we've logged in
    })
    .catch(function(error) { // This is a catch in the case that there's an error. Not using this will result in an unhandled rejection error.
        console.log(`Login error: ${error}`) // Log the error to console if there is one.
    });
 
function isCommand(command, message){
    var command = command.toLowerCase();
    var content = message.content.toLowerCase();
    return content.startsWith(prefix + command);
}
 
client.on('message', (message) => {
    if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
   
    if(isCommand('rank', message)){
    
       if(!message.member.roles.some(r=>["BotAdmin","Developers","Chairman"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
        return message.reply("You do not have permission to use this command. Very sad. ");
        var username = args[1]
        var rankIdentifier = Number(args[2]) ? Number(args[2]) : args[2];
        if (!rankIdentifier) return message.channel.send("Please enter a rank");
        if (username){
          //embed start
          message.channel.send({embed: {
            color: 14177041,
            description: `Checking ROBLOX for ${username}`
          }});
          //end

            //message.channel.send(`Checking ROBLOX for ${username}`)
            roblox.getIdFromUsername(username)
            .then(function(id){
                roblox.getRankInGroup(groupId, id)
                .then(function(rank){
                    if(maximumRank <= rank){
                      message.channel.send({embed: {
                        color: 14177041,
                        description: `${id} is rank ${rank} and not promotable. :exclamation: `
                      }});
                        //message.channel.send(`${id} is rank ${rank} and not promotable.`)
                    } else {
                      message.channel.send({embed: {
                        color: 14177041,
                        description: `${id} is rank ${rank} and promotable. :white_check_mark: `
                      }});
                     
                        //message.channel.send(`${id} is rank ${rank} and promotable.`)
                        roblox.setRank(groupId, id, rankIdentifier)
                        .then(function(newRole){
                          message.channel.send({embed: {
                            color: 3447003,
                            description: `Changed rank to ${newRole.Name}`
                          }});
                            //message.channel.send(`Changed rank to ${newRole.Name}`)
                        }).catch(function(err){
                            console.error(err)
                            message.channel.send({embed: {
                              color: 3447003,
                              description: `:exclamation:  I'm not even ranked or I have a invalid cookie <@459017979103936523> revive me. :exclamation: `
                            }});
                            //message.channel.send("I'm not even ranked or I have a invalid cookie <@459017979103936523> revive me.")
                        });
                    }
                }).catch(function(err){
                    message.channel.send("This mans is not even in the group.")
                });
            }).catch(function(err){
                message.channel.send(`Sorry, but ${username} doesn't exist on ROBLOX.`)
           });
       } else {
           message.channel.send("Please enter a username.")
       }
       return;
   }
})




  client.on("ready", () => {
    client.user.setActivity("builderman", { type: "STREAMING", url: "https://www.roblox.com/users/84803860/profile" })
  })
  
 
   
  client.on('message', function(message){
    if(message.content == '+help')
  {
    message.channel.send({embed: {
        color: 3447003,
        
        
        title: "Here are the commands.",
        
        description: "Discord -> roblox",
        fields: [{
            name: "+rank (plr) (role #)",
            value: "Ranks the player in the group"
          },
          
          
        ],
       
       
        timestamp: new Date(),
        footer: {
          
          text: "Buildermane"
        }
      }
    });
  }
  
  });
