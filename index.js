

const Commando = require('discord.js-commando');
const talkedRecently = new Set();

const roblox = require('noblox.js')
const Discord = require('discord.js')
const client = new Discord.Client();
var token = "NTY5ODcyMzk5MzQwOTI5MDI0.XNS34w.yvRyJd8cLPtKcdAvUcyZGuApt78";

client.login(token)

var cookie = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_AB48B87288A19A7F33F1B8B4D703D5CD6A3094ABC195B55F69926373C38E4C9B6DB6EA79CB8E0EC580E76D1D50C1B28E079DCEC7C7E98E06D2C6A150660BA33D143AAE3D2A675FB5C904A7C7D70AE7095864F3E853D6265FEFC43BE7C001E74632DFF835C8E3BFFFC7850B0E4FFF5AFCBBE2A74AEDF213B00124A3E44B32502A08836C6E04EBE07E218870988DBC81958FB510A778B4040CB3D10C5BFAC0489C118C487D27483B798958D2E5434E337C29AA261EB5EA0909650C44F6C26757848FB4C4DBB18C36BC3B8EF96F8E4D0BB7268013882180B80842EA20C8F433735D3E000D2F8D66CE1FBE842721F527A5069571D8AA0144EA2CA6F1A4379D6923E85EE67002FBAB26D19E3D9E2DAAF860E158F5A335FDCF5E8EB79E13D53D588B1D93844A8E43E50B6B15E07DD2E96A46B874C8E09453F2D2E70A9F24B68DF2E18D8ED25529";

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
