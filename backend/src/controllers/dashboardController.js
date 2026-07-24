import prisma from "../config/prisma.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalTasks = await prisma.task.count({
  where: {
    project: {
      userId: req.user.id,
    },
  },
});
const totalProjects = await prisma.project.count({
  where: {
    userId: req.user.id,
  },
});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};