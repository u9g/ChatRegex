# ChatRegex

This package is a plugin for mineflayer to allow for matching a series of regex paterns.

## Example:

```js
const mineflayer = require('mineflayer')
const bot = mineflayer.createBot()
bot.loadPlugin(require('./plugin.js'))

bot.on('spawn', () => {
  bot.chatregex.addPatternSet('helloworld', [/<.+> Hello(.+)/, /<.+> World(.+)/], { repeat: true, parse: true })
  bot.chatregex.on('helloworld', (matches) => {
    console.log(matches)
  })
})
```
In chat:
```
<U9G> Hello1
<U9G> World2
```
Output:
`['<U9G> Hello1'], ['<U9G> World2']]`
  
## API

#### Functions

##### bot.chat.regex.addPatternSet(name, patterns, options?)

`name` - (string) name of the event emitted when the set is fully matched

`patterns` - (Array\<RegExp>) array of regex patterns to match befor emitting matches

`options` - (object) optional
- repeat - (boolean) whether to emit this event multiple times, default is false
- parse - (boolean) whether to only emit the capture groups gotten from the matches, default is false

#### Events

##### "{name}" (matches) - emitted when all patterns are matched
- matches - (Array\<string>) array of matches