const fs = require('fs');

// We will compile the file to get the data
require('ts-node/register'); // if available, or we can just read it by replacing
// Wait, ts-node might not be available. We can just use the Prisma BankRate table instead of the static file!
