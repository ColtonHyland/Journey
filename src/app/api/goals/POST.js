import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  const userId = session.user.id;
  const { status, specific, measurable, achievable, relevant, timeBound, actionPlan } = await request.json();

  try {
    const goal = await prisma.goal.create({
      data: {
        userId,
        title: specific.title,
        description: specific.description,
        what: specific.what,
        why: specific.why,
        who: specific.who,
        where: specific.where,
        resources: specific.resources,
        howMuch: measurable.howMuch,
        howMany: measurable.howMany,
        accomplishment: measurable.accomplishment,
        measurableQuantifiers: measurable.quantifiers,
        how: achievable.how,
        realistic: achievable.realistic,
        achievableQuantifiers: achievable.quantifiers,
        worthwhile: relevant.worthwhile,
        rightTime: relevant.rightTime,
        matches: relevant.matches,
        rightPerson: relevant.rightPerson,
        applicable: relevant.applicable,
        due_date: new Date(timeBound.dueDate),
        milestones: timeBound.milestones,
        actionPlan,
        status,
      },
    });

    return new Response(JSON.stringify(goal), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating goal:', error);
    return new Response(JSON.stringify({ error: 'Failed to create goal' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
