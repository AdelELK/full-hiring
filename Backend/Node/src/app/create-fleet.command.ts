import type { Arguments } from 'yargs';
import { createNewFleet } from '../domain/fleet.service';

type Options = {
  userId: string;
};

export const command = 'create <userId>';
export const desc = 'Create a new fleet for the given user';

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { userId } = argv;
  const fleet = await createNewFleet(userId)
  process.stdout.write(fleet.id)
  process.exit(0)
};