// app.js
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// Create a new asset
export async function createAsset(req: Request, res: Response) {
  try {
    const { title, description, assignee, created_by, asset_type, attachment, status } = req.body;
    const newAsset = await prisma.assets.create({
      data: {
        uuid: uuidv4(), // Generate UUID
        title,
        description,
        assignee,
        created_by,
        asset_type,
        attachment,
        status,
      },
    });
    // return newAsset
    res.status(201).json(newAsset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create asset' });
  }
}

// Get all assets
export async function allAsset(req: Request, res: Response) {
  try {
    const assets = await prisma.assets.findMany();
    res.status(200).json(assets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve assets' });
  }
}

// Get a single asset by uuid
export async function singleAsset(req: Request, res: Response) {
  try {
    const { uuid } = req.params;
    const asset = await prisma.assets.findUnique({
      where: { uuid },
    });
    if (!asset) return res.status(404).json({ error: 'Asset not found' });
    res.status(200).json(asset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve asset' });
  }
}

// // Update an asset by uuid
// app.put('/assets/:uuid', async (req, res) => {
//   try {
//     const { uuid } = req.params;
//     const { title, description, assignee, created_by, asset_type, attachment, status } = req.body;
//     const updatedAsset = await prisma.assets.update({
//       where: { uuid },
//       data: {
//         title,
//         description,
//         assignee,
//         created_by,
//         asset_type,
//         attachment,
//         status,
//         updated_at: new Date(), // Update the timestamp
//       },
//     });
//     res.status(200).json(updatedAsset);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to update asset' });
//   }
// });

// // Delete an asset by uuid
// app.delete('/assets/:uuid', async (req, res) => {
//   try {
//     const { uuid } = req.params;
//     const deletedAsset = await prisma.assets.delete({
//       where: { uuid },
//     });
//     res.status(200).json(deletedAsset);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to delete asset' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
