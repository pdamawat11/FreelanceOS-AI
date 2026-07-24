import prisma from "../config/prisma.js";

export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      deadline,
      projectId,
    } = req.body;

    // Check if the project belongs to the logged-in user
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: req.user.id,
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        deadline: deadline ? new Date(deadline) : null,
        projectId,
      },
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getProjectTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: req.user.id,
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const tasks = await prisma.task.findMany({
      where: {
        projectId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findFirst({
      where: {
        id,
        project: {
          userId: req.user.id,
        },
      },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const updatedTask = await prisma.task.update({
      where: {
        id,
      },
      data: req.body,
    });

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findFirst({
      where: {
        id,
        project: {
          userId: req.user.id,
        },
      },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await prisma.task.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};