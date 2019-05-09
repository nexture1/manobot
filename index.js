

const Commando = require('discord.js-commando');
const talkedRecently = new Set();

const roblox = require('noblox.js')
const Discord = require('discord.js')
const client = new Discord.Client();
var token = "NTY5ODcyMzk5MzQwOTI5MDI0.XNS34w.yvRyJd8cLPtKcdAvUcyZGuApt78";

client.login(token)

var cookie = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_B649BE5209B77831FA0B8BF227F3960C718FD486DD4F1DFE3C2BD817433E4E78CC40AD46DA6C3937A5A237E690ADCC3B7CA5489DDC9E22626AD1223E8EED1D3F1C6702EF5F4099033FC04CAC63005D763E4C7F37B63757BF64CBBEC29FF278C0CFA97B9B082AA05BADE97F36B1357B63CC9DE97013CD777241B8A8A3F525F2244C147466DB1D892D6A345CEA26BC878362FAF16B2CE2897A239633BC0C1B25BE9538976F7C1D7D8707B69578AC026DBE6305891E8DBA0650E9364A6C08E793B34F8781F7FEA1E37A44931909A1EC884FCB99BD2C0938A3A0FC0A5689B417C94344A6DE2390F09C7C9A6B43719C7E5B531418CB3BDE61EB73B1910998E98D39E403643884A75DF24D2CBC713DCFD53359E67FEAE16A0EB09163315B001255851C6284365D5FAA6138F818A87C28CAEDDE66BC12B764A9F2BBEE69EC43BC10E299E804A32D";

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
