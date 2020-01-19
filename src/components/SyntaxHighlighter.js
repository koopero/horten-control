import Lowlight from 'react-lowlight'
// Load any languages you want to use
// (see https://github.com/isagalaev/highlight.js/tree/master/src/languages)
import js from 'highlight.js/lib/languages/javascript'
import yaml from 'highlight.js/lib/languages/yaml'
import glsl from 'highlight.js/lib/languages/glsl'
import markdown from 'highlight.js/lib/languages/markdown'



Lowlight.registerLanguage('js', js )
Lowlight.registerLanguage('yaml', yaml )
Lowlight.registerLanguage('glsl', glsl )
Lowlight.registerLanguage('markdown', markdown )



export default Lowlight