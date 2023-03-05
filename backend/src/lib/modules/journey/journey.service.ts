import prisma from '../../utils/prisma';
import { UpsertJourneyInput } from './journey.schema';

export const getAllJourney = async () => {
  return await prisma.journey.findMany();
};

export const upsertJourney = async (input: UpsertJourneyInput) => {
  if (input.id) {
    return await prisma.journey.update({
      data: { ...input },
      where: { id: input.id },
    });
  } else {
    return await prisma.journey.create({
      data: { ...input },
    });
  }
};
