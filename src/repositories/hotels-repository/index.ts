import { prisma } from "@/config";

async function findHotels() {
  return prisma.hotel.findMany();
}

async function findHotel(hotelId: number) {
  return prisma.hotel.findUnique({
    where: {
      id: hotelId,
    },
  });
}

async function findHotelRooms(hotelId: number) {
  return prisma.room.findMany({
    where: {
      hotelId: hotelId,
    },
  });
}

const hotelRepository = {
  findHotels,
  findHotel,
  findHotelRooms,
};

export default hotelRepository;
