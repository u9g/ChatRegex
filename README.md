# ChatRegex

This package is a plugin for mineflayer to allow for matching a series of regex paterns.

# Installation:

`npm i chatregex`

## Example:

```js
const mineflayer = require('mineflayer')
const bot = mineflayer.createBot()
bot.loadPlugin(require('chatregex'))

bot.on('spawn', () => {
  bot.chatregex.addPatternSet('helloworld', [/<.+> Hello(.+)/, /<.+> World(.+)/], { repeat: true })
})

bot.on('chat:helloworld', (matches) => {
    console.log(matches)
})
```
In chat:
```
<U9G> Hello1
<U9G> World2
```
Output:
`[['<U9G> Hello1'], ['<U9G> World2']]`
  
## API

#### Functions

##### bot.chat.regex.addPatternSet(name, patterns, options?)

`name` - (string) name of the event emitted when the set is fully matched

`patterns` - (Array\<RegExp>) array of regex patterns to match before emitting matches

`options` - (object) optional
- repeat - (boolean) whether to emit this event multiple times, default is false
- parse - (boolean) whether to only emit the capture groups gotten from the matches, default is false

#### Events

##### "chat:{name}" (matches) - emitted when all patterns are matched, this event is on the bot object
- matches - (Array\<string>) array of matches