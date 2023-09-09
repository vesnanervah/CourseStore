// Code from Wouter's matcher https://github.com/molefrog/wouter/blob/main/matcher.js
// TODO: replace with our own implementation
export default function makeMatcher(makeRegexpFn = pathToRegexp) {
  return (pattern: string, path: string) => {
    const { regexp, keys } = makeRegexpFn(pattern || '');
    const out = regexp.exec(path);

    if (!out) return [false, null];

    const params = keys.reduce(
      (params: { [key: string]: string }, key: { name: string }, i: number) => {
        params[key.name] = out[i + 1];
        return params;
      },
      {},
    );

    return [true, params];
  };
}

// escapes a regexp string (borrowed from path-to-regexp sources)
// https://github.com/pillarjs/path-to-regexp/blob/v3.0.0/index.js#L202
const escapeRx = (str: string) => str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');

// returns a segment representation in RegExp based on flags
// adapted and simplified version from path-to-regexp sources
const rxForSegment = (repeat: boolean, optional: boolean, prefix: number) => {
  let capture = repeat ? '((?:[^\\/]+?)(?:\\/(?:[^\\/]+?))*)' : '([^\\/]+?)';
  if (optional && prefix) capture = '(?:\\/' + capture + ')';
  return capture + (optional ? '?' : '');
};

const pathToRegexp = (pattern: string) => {
  const groupRx = /:([A-Za-z0-9_]+)([?+*]?)/g;

  const keys = [];
  let match = null,
    lastIndex = 0,
    result = '';

  while ((match = groupRx.exec(pattern)) !== null) {
    const [, segment, mod] = match;

    // :foo  [1]      (  )
    // :foo? [0 - 1]  ( o)
    // :foo+ [1 - ∞]  (r )
    // :foo* [0 - ∞]  (ro)
    const repeat = mod === '+' || mod === '*';
    const optional = mod === '?' || mod === '*';
    const prefix = optional && pattern[match.index - 1] === '/' ? 1 : 0;

    const prev = pattern.substring(lastIndex, match.index - prefix);

    keys.push({ name: segment });
    lastIndex = groupRx.lastIndex;

    result += escapeRx(prev) + rxForSegment(repeat, optional, prefix);
  }

  result += escapeRx(pattern.substring(lastIndex));
  return { keys, regexp: new RegExp('^' + result + '(?:\\/)?$', 'i') };
};
