const EventEmitter = require('events')

function inject (bot) {
  const _chatregex = []
  bot.chatregex = new EventEmitter()
  bot.chatregex.addNew = (name, patterns, { repeat, parse }) => {
    _chatregex.push({ name, patterns, position: 0, matches: [], repeat, parse })
  }

  const getChatMap = () => _chatregex.map(({ patterns, position: ix }) => patterns[ix])

  bot.on('messagestr', msg => {
    const patterns = getChatMap()
    if (!patterns.some(pattern => pattern.test(msg))) return

    const ix = patterns.findIndex(pattern => pattern.test(msg))
    _chatregex[ix].matches.push(msg)
    _chatregex[ix].position++

    // we have all messages needed
    if (_chatregex[ix].patterns.length === _chatregex[ix].position) {
      if (_chatregex[ix].parse) {
        const matches = _chatregex[ix].patterns.map((pattern, i) => _chatregex[ix].matches[i].match(pattern))
        matches.forEach(o => o.splice(0, 1)) // delete full message match
        bot.chatregex.emit(_chatregex[ix].name, matches)
      } else {
        bot.chatregex.emit(_chatregex[ix].name, _chatregex[ix].matches)
      }

      // run again
      if (!_chatregex[ix].repeat) {
        _chatregex.position = 0
        _chatregex.matches = []
      } else {
        _chatregex.splice(ix, 1)
      }
    }
  })
}

module.exports = inject
