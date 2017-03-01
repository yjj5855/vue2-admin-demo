import color from 'css-color-function'

const formula = {
  'secondary': 'color(primary s(99%) l(*0.9))',
  'darkWhite': 'color(#fff blend(primary 2%))',
  'baseBlack': 'color(primary h(+6) s(33%) l(18%))',
  'lightBlack': 'color(baseBlack h(+5) s(27%) l(27%))',
  'extraLightBlack': 'color(baseBlack h(+2) s(19%) l(35%))',
  'baseSilver': 'color(baseBlack h(+3) s(16%) l(58%))',
  'lightSilver': 'color(baseBlack h(+3) s(23%) l(67%))',
  'extraLightSilver': 'color(baseBlack s(26%) l(80%))',
  'baseGray': 'color(baseBlack s(28%) l(86%))',
  'lightGray': 'color(baseBlack h(+10) s(33%) l(92%))',
  'extraLightGray': 'color(baseBlack h(+6) s(33%) l(95%))',
  'buttonActive': 'color(primary shade(10%))',
  'buttonHover': 'color(primary tint(20%))',
  'tableBorder': 'color(extraLightSilver h(-3) s(27%) l(90%))',
  'datepickerInRange': 'color(primary tint(80%))',
  'datepickerInRangeHover': 'color(primary tint(64%))',
  'selectOptionSelected': 'color(primary shade(12%))',
  'lightBackground': 'color(primary tint(92%))',
  'emptyText': 'color(primary s(16%) l(44%))',

  'info': 'color(info)',
  'success': 'color(success)',
  'warning': 'color(warning)',
  'danger': 'color(danger)'
}

const generateColors = (primary, info, success, warning, danger) => {
  let colors = {}
  let baseBlack = ''
  let extraLightBlack = ''
  let extraLightSilver = ''

  Object.keys(formula).forEach(key => {
    const value = formula[key]
      .replace(/primary/g, primary)
      .replace(/info/g, info)
      .replace(/success/g, success)
      .replace(/warning/g, warning)
      .replace(/danger/g, danger)
      .replace(/baseBlack/g, baseBlack)
      .replace(/extraLightBlack/g, extraLightBlack)
      .replace(/extraLightSilver/g, extraLightSilver)
    colors[key] = color.convert(value)
    if (key === 'baseBlack') {
      baseBlack = colors[key]
    }
    if (key === 'extraLightBlack') {
      extraLightBlack = colors[key]
    }
    if (key === 'extraLightSilver') {
      extraLightSilver = colors[key]
    }
  })
  return colors
}

export default generateColors
