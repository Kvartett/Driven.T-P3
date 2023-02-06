import { AuthenticatedRequest } from "@/middlewares";
import hotelService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getAllHotels(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const hotels = await hotelService.getAllHotels(userId);

    return res.status(httpStatus.OK).send(hotels);
  } catch (err) {
    if (err.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    if (err.name === "PaymentRequired") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }

    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getHotelRooms(req: AuthenticatedRequest, res: Response) {
  try {
    const hotelId = parseInt(req.params.hotelId);
    const { userId } = req;

    if (isNaN(hotelId)) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const rooms = await hotelService.getHotelRooms(hotelId, userId);

    if (!rooms) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    res.status(httpStatus.OK).send(rooms);
  } catch (err) {
    if (err.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    if (err.name === "PaymentRequired") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }

    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
