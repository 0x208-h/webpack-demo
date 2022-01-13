import _ from 'lodash'
import $ from 'jquery'

const dom = $('<div>')
dom.html(_.join(['H', 'C', 'H']), '----')
$('body').append(dom);