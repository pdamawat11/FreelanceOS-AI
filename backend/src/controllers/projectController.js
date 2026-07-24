import prisma from "../config/prisma.js";

export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      clientName,
      budget,
      startDate,
      deadline,
    } = req.body;

    const project = await prisma.project.create({
      data: {
        title,
        description,
        clientName,
        budget,
        startDate: new Date(startDate),
        deadline: new Date(deadline),
        userId: req.user.id,
      },
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const updatedProject = await prisma.project.update({
      where: {
        id,
      },
      data: req.body,
    });

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project: updatedProject,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await prisma.project.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};