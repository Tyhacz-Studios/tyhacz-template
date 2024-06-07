import Express from 'express'
import { FilterQuery } from 'mongoose'
import { handleError } from '../errors/handleError'
import { Search, SearchType } from '../models/Search'
import Stytch from '../services/stytch'

export const createSearch = async (req: Express.Request, res: Express.Response) => {
    try {
        const requestingUser = await Stytch.getSessionFromRequest(req)

        const createdSearch = await Search.create({
            ...req.body,
            user: requestingUser._id
        })

        res.json(createdSearch).status(201)
    } catch (err) {
        handleError(err, res)
    }
}

export const getSearches = async (req: Express.Request, res: Express.Response) => {
    try {
        const requestingUser = await Stytch.getSessionFromRequest(req)

        const searchFilters: FilterQuery<SearchType> = {}

        if (!requestingUser.superAdmin) {
            searchFilters.user = requestingUser._id
        }

        const searches = await Search.find(searchFilters, {
            checkedPosts: 0
        }).populate('leads').lean()

        res.json(searches).status(200)
    } catch (err) {
        handleError(err, res)
    }
}

export const getOneSearch = async (req: Express.Request, res: Express.Response) => {
    try {
        const requestingUser = await Stytch.getSessionFromRequest(req)

        const searchFilters: FilterQuery<SearchType> = {
            _id: req.params.searchId
        }

        if (!requestingUser.superAdmin) {
            searchFilters.user = requestingUser._id
        }

        const search = await Search.findOne(searchFilters, {
            checkedPosts: 0
        }).populate('leads').lean()

        res.json(search).status(200)
    } catch (err) {
        handleError(err, res)
    }
}

export const deleteSearch = async (req: Express.Request, res: Express.Response) => {
    try {
        const requestingUser = await Stytch.getSessionFromRequest(req)

        const searchFilters: FilterQuery<SearchType> = {
            _id: req.params.searchId
        }

        if (!requestingUser.superAdmin) {
            searchFilters.user = requestingUser._id
        }

        const searchExists = await Search.exists(searchFilters)

        if (!searchExists) {
            return res.status(404).json({
                error: 'Keywords search not found.'
            }).end()
        }

        await Search.deleteOne(searchFilters)

        res.status(204).end()
    } catch (err) {
        handleError(err, res)
    }
}
