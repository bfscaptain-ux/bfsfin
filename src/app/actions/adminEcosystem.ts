'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1. Client Origin Tracker (Deep Query)
export async function searchClientOrigin(query: string) {
  try {
    if (!query || query.length < 2) return { success: true, data: { leads: [], customers: [] } };

    // Search Leads
    const leads = await prisma.lead.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { email: { contains: query } },
          { phone: { contains: query } },
          { id: { contains: query } }
        ]
      },
      include: {
        user: { // The partner who submitted it
          include: { partnerProfile: true }
        }
      },
      take: 10
    });

    // Search Customers (Users with role='CUSTOMER')
    const customers = await prisma.user.findMany({
      where: {
        role: 'CUSTOMER',
        OR: [
          { name: { contains: query } },
          { email: { contains: query } },
          { phone: { contains: query } },
        ]
      },
      include: {
        referredBy: { // The partner who referred them
          include: { partnerProfile: true }
        }
      },
      take: 10
    });

    return { success: true, data: { leads, customers } };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// 2. Rewards Management
export async function getAdminRewardTargets() {
  try {
    const targets = await prisma.rewardTarget.findMany({
      orderBy: { targetValue: 'asc' },
      include: {
        _count: { select: { claims: true } }
      }
    });
    return { success: true, data: targets };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createRewardTarget(data: { title: string, description: string, targetValue: number, imageUrl: string }) {
  try {
    const target = await prisma.rewardTarget.create({ data });
    return { success: true, data: target };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function toggleRewardTarget(id: string, isActive: boolean) {
  try {
    await prisma.rewardTarget.update({
      where: { id },
      data: { isActive }
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// 3. Claims Management
export async function getAdminRewardClaims() {
  try {
    const claims = await prisma.rewardClaim.findMany({
      orderBy: { claimedAt: 'desc' },
      include: {
        user: true,
        reward: true
      }
    });
    return { success: true, data: claims };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateClaimStatus(id: string, status: string) {
  try {
    await prisma.rewardClaim.update({
      where: { id },
      data: { status }
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// 4. Leaderboard
export async function getAdminLeaderboard() {
  try {
    const profiles = await prisma.rewardProfile.findMany({
      orderBy: { totalPoints: 'desc' },
      include: {
        user: {
          include: { partnerProfile: true }
        }
      }
    });
    return { success: true, data: profiles };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// 5. Marketing Assets
export async function getAdminMarketingAssets() {
  try {
    const assets = await prisma.marketingAsset.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: true } // If specific to a partner
    });
    return { success: true, data: assets };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createMarketingAsset(data: { title: string, assetUrl: string, fileType: string, userId?: string }) {
  try {
    const asset = await prisma.marketingAsset.create({ data });
    return { success: true, data: asset };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
