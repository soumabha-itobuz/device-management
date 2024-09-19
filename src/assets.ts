// app.js
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new asset
export async function createAsset(req: Request, res: Response) {
  try {
    const { title, description, assignee, created_by, asset_type, attachment, status } = req.body;
    const newAsset = await prisma.asset.create({
      data: {
        title,
        description,
        assignee,
        created_by,
        asset_type,
        attachment,
        status,
        assignee_id: assignee.id || null,
      },
    });
    // return newAsset
    res.status(201).json(newAsset);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

// Get all assets
export async function allAsset(req: Request, res: Response) {
  try {
    const assets = await prisma.asset.findMany();
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
    const asset = await prisma.asset.findUnique({
      where: { uuid },
    });
    if (!asset) return res.status(404).json({ error: 'Asset not found' });
    res.status(200).json(asset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve asset' });
  }
}

// Update an asset by uuid
export async function updateAsset(req: Request, res: Response) {
  try {
    const { uuid } = req.params;
    const { title, description, assignee, created_by, asset_type, attachment, status } = req.body;
    const updatedAsset = await prisma.asset.update({
      where: { uuid },
      data: {
        title,
        description,
        assignee,
        created_by,
        asset_type,
        attachment,
        status,
        updated_at: new Date(), // Update the timestamp
      },
    });
    res.status(200).json(updatedAsset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update asset' });
  }
}

// Delete an asset by uuid
export async function deleteAsset(req: Request, res: Response) {
  try {
    const { uuid } = req.params;
    const deletedAsset = await prisma.asset.delete({
      where: { uuid },
    });
    res.status(200).json(deletedAsset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete asset' });
  }
}

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
