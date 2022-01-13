import _ from 'lodash'
import $ from 'jquery'
import { ui } from './jquery.ui'

const dom = $('<div>')
ui()
dom.html(_.join(['H', 'C', 'H']), '----')
$('body').append(dom);