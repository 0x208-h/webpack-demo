// Tree Shaking 只支持 ES Module 因为 Tree Shaking 只支持 静态引入， Command JS是动态引入
import { add } from './math'

add(113,24)