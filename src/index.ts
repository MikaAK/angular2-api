import {provide} from 'angular2/core'
import {Http} from 'angular2/http'
import {ApiService} from './ApiService'
import {ApiResource} from './ApiResource'

export {ApiService, ApiResource}

export const provideApiService = () => [provide(ApiService, {deps: [Http]})]
