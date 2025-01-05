import {Request} from 'express';

export type RequestWithAddTown<B> = Request<{},{},B>
export type RequestWithDeleteTown<Q> = Request<{},{},{},Q>


export type AdminAddTownModel = {
	town: string
}
export type DeleteTownModel = {townId: string}