import { notFoundError } from "@/errors";
import hotelRepository from "@/repositories/hotels-repository";

async function getAllHotels() {
  const hotels = await hotelRepository.findHotels();

  if (!hotels) {
    throw notFoundError();
  }

  return hotels;
}

async function getHotelRooms(hotelId: number) {
  const hotel = await hotelRepository.findHotel(hotelId);
  if (!hotel) {
    throw notFoundError();
  }
  const rooms = await hotelRepository.findHotelRooms(hotelId);
  if (!rooms) {
    throw notFoundError();
  }

  const body = {
    id: hotel.id,
    name: hotel.name,
    image: hotel.image,
    createdAt: hotel.createdAt.toISOString(),
    updatedAt: hotel.updatedAt.toISOString(),
    Rooms: [
      rooms
    ]
  };

  return body;
} 

const hotelService = {
  getAllHotels,
  getHotelRooms,
};

export default hotelService;
