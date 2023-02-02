const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.room.create({
    data: {
      name: 'my first room.'
    }
  })

  await prisma.room.create({
    data: {
      name: 'my second room.'
    }
  })
}

main().catch(e => console.log(e))
