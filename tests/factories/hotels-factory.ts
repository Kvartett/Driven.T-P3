import { prisma } from "@/config";
import faker from "@faker-js/faker";
import { randomInt } from "crypto";

export async function createHotel() {
  return prisma.hotel.create({
    data: {
      name: faker.company.companyName(),
      image: faker.image.business(),
    }
  });
}

export async function createRoom(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.company.companyName(),
      capacity: randomInt(1, 4),
      hotelId: hotelId
    }
  });
}
