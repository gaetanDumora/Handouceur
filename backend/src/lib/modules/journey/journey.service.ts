import prisma from '../../utils/prisma';
import { UpsertJourneyInput } from './journey.schema';

export const getAllJourney = async () => {
  return await prisma.journey.findMany();
};

export const gerJourney = async (id: number) => {
  return await prisma.journey.findFirst({
    where: { id },
  });
};

export const upsertJourney = async (input: UpsertJourneyInput) => {
  if (input.id) {
    return await prisma.journey.update({
      data: { ...input },
      where: { id: input.id },
    });
  }
  return await prisma.journey.create({
    data: { ...input },
  });
};
export const updateImages = async (input: {
  journeyId: number;
  images: string[];
}) => {
  const journey = await prisma.journey.update({
    where: { id: input.journeyId },
    data: { images: input.images },
  });
  return journey;
};
