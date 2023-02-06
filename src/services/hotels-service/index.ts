import { notFoundError, paymentRequired } from "@/errors";
import hotelRepository from "@/repositories/hotels-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function validateUserInformations(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket) {
    throw notFoundError();
  }

  if (ticket.status === "RESERVED") {
    throw paymentRequired();
  }

  // const ticketType = await ticketRepository.findTicketTypeById(ticket.ticketTypeId);

  if (ticket.TicketType.isRemote === true || ticket.TicketType.includesHotel === false) {
    throw paymentRequired();
  }
}

async function getAllHotels(userId: number) {
  await validateUserInformations(userId);
  const hotels = await hotelRepository.findHotels();

  if (hotels.length === 0) {
    throw notFoundError();
  }

  return hotels;
}

async function getHotelRooms(hotelId: number, userId: number) {
  await validateUserInformations(userId);
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
    Rooms: rooms
    
  };

  return body;
} 

const hotelService = {
  getAllHotels,
  getHotelRooms,
};

export default hotelService;
