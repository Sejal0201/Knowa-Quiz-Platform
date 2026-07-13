import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/AdminDashboard.css";

import API from "../api";
import {
  ClipboardList,
  PlayCircle,
  Users,
  BarChart3,
  LogOut,
  PlusCircle,
  FolderOpen,
  ChartColumn,
  Eye,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  Legend,
} from "recharts";

import { BrainCircuit } from "lucide-react";
function AdminDashboard() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [batchAnalytics, setBatchAnalytics] = useState([]);
  const [performance, setPerformance] = useState([]);
  const [recentStudents, setRecentStudents] = useState([]);
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    activeQuiz: 0,
    totalStudents: 0,
    totalAttempts: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
    fetchBatches();
  }, []);
  const fetchDashboardStats = async () => {
    try {
      const res = await API.get("/quiz/dashboard-stats");

      setStats(res.data.stats);
      const resultsRes = await API.get("/quiz/results");

      setActivities(resultsRes.data.results.slice(-5).reverse());
      const performanceRes = await API.get("/quiz/performance");
      const batchRes = await API.get("/quiz/batch-analytics");
      const recentStudentsRes = await API.get("/quiz/recent-students");
      const [batches, setBatches] = useState([]);
      const [newBatch, setNewBatch] = useState("");
      setBatchAnalytics(batchRes.data.analytics);
      setPerformance(performanceRes.data.performance);
      setRecentStudents(recentStudentsRes.data.students);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchBatches = async () => {
    try {
      const res = await API.get("/batch");

      setBatches(res.data.batches);
    } catch (error) {
      console.log(error);
    }
  };
  const addBatch = async () => {
    if (!newBatch.trim()) {
      alert("Enter Batch Name");
      return;
    }

    try {
      await API.post("/batch/create", {
        name: newBatch,
      });

      setNewBatch("");

      fetchBatches();

      alert("Batch Added Successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create batch");
    }
  };
  const deleteBatch = async (id) => {
    if (!window.confirm("Delete this batch?")) return;

    try {
      await API.delete(`/batch/${id}`);

      fetchBatches();
    } catch (error) {
      console.log(error);
    }
  };
  const chartData = performance.map((quiz) => ({
    name: quiz.quizTitle,
    accuracy: Number(quiz.averageAccuracy),
  }));
  const COLORS = ["#006bff", "#fdab23", "#4f46e5", "#10b981", "#ef4444"];
  return (
    <div className="admin-container">
      {/* Header */}

      <div className="admin-header">
        {/* <div className="brand-section"> */}
        <div className="brand-section">
          <div className="brand-logo">
            <BrainCircuit size={34} />
          </div>

          <div>
            <span className="dashboard-tag">ADMIN PANEL</span>

            <h1 className="admin-title">BetterMind Labs</h1>

            <p className="admin-subtitle">Quiz Administration Dashboard</p>
          </div>
        </div>
        <div className="header-right">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search quizzes or students..."
              className="dashboard-search"
            />
          </div>

          <div className="admin-profile">
            <div className="profile-avatar">A</div>

            <div>
              <h4>Admin</h4>

              <p>System Administrator</p>
            </div>
          </div>

          <button
            className="logout-btn"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
        {/* <div className="brand-logo">
            <BrainCircuit size={30} />
          </div> */}
        {/* <div className="dashboard-header">
            <div>
              <h1 className="admin-title">BetterMind Labs</h1>
              <p className="admin-subtitle">Quiz Administration Dashboard</p>
            </div>
          </div> */}
        {/* <div>
            <h1 className="admin-title">BetterMind Labs</h1>
            <p className="admin-subtitle">Quiz Administration Dashboard</p>
          </div> */}
        {/* </div> */}
        {/* <div className="header-right"> */}
        {/* <div className="admin-profile">
            <div className="profile-avatar">A</div>

            <div>
              <h4>Admin</h4>
              <p>Quiz Manager</p>
            </div>
          </div> */}
        {/* <button
            className="logout-btn"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            <LogOut size={18} />
            Logout
          </button> */}
        {/* </div> */}
      </div>
      {/* <div className="top-bar">
        <input
          type="text"
          placeholder="Search quizzes, students..."
          className="dashboard-search"
        />
      </div> */}

      {/* STATSSS */}
      {/* <div className="stats-grid">
        <div className="stats-card purple">
          <ClipboardList size={28} />
          <h2>{stats.totalQuizzes}</h2>
          <p>Total Quizzes</p>
        </div>

        <div className="stats-card pink">
          <PlayCircle size={28} />
          <h2>{stats.activeQuiz}</h2>
          <p>Active Quiz</p>
        </div>

        <div className="stats-card blue">
          <Users size={28} />
          <h2>{stats.totalStudents}</h2>
          <p>Students</p>
        </div>

        <div className="stats-card orange">
          <BarChart3 size={28} />
          <h2>{stats.totalAttempts}</h2>
          <p>Total Attempts</p>
        </div>
      </div> */}

      <div className="stats-grid">
        <div className="stats-card primary-card">
          <div className="stats-icon">
            <ClipboardList size={26} />
          </div>

          <div className="stats-content">
            <span>Total Quizzes</span>
            <h2>{stats.totalQuizzes}</h2>
            <p>Created assessments</p>
          </div>
        </div>

        <div className="stats-card secondary-card">
          <div className="stats-icon">
            <PlayCircle size={26} />
          </div>

          <div className="stats-content">
            <span>Active Quiz</span>
            <h2>{stats.activeQuiz}</h2>
            <p>Currently running</p>
          </div>
        </div>

        <div className="stats-card primary-card">
          <div className="stats-icon">
            <Users size={26} />
          </div>

          <div className="stats-content">
            <span>Students</span>
            <h2>{stats.totalStudents}</h2>
            <p>Registered learners</p>
          </div>
        </div>

        <div className="stats-card secondary-card">
          <div className="stats-icon">
            <BarChart3 size={26} />
          </div>

          <div className="stats-content">
            <span>Total Attempts</span>
            <h2>{stats.totalAttempts}</h2>
            <p>Quiz submissions</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}

      <div className="dashboard-content">
        {/* <div className="performance-card">
          <h2>Quiz Performance</h2>

          <div className="circle-progress-grid">
            {performance.map((quiz, index) => {
              const COLORS = [
                ["#006bff", "#e6f0ff"], // Blue
                ["#fdab23", "#fff4de"], // Orange
                ["#006bff", "#e6f0ff"], // Blue
                ["#fdab23", "#fff4de"], // Orange
              ];

              return (
                <div key={quiz.quizTitle} className="circle-card">
                  <PieChart width={220} height={220}>
                    <Pie
                      data={[
                        {
                          name: "Completed",
                          value: Number(quiz.averageAccuracy),
                        },
                        {
                          name: "Remaining",
                          value: 100 - Number(quiz.averageAccuracy),
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={90}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                      stroke="none"
                    >
                      <Cell fill={COLORS[index % COLORS.length][0]} />
                      <Cell fill={COLORS[index % COLORS.length][1]} />
                    </Pie>
                  </PieChart>

                  <div className="circle-center">
                    <h2>{quiz.averageAccuracy}%</h2>
                  </div>

                  <h4>{quiz.quizTitle}</h4>
                </div>
              );
            })}
          </div>
        </div> */}

        <div className="performance-card">
          <div className="section-heading">
            <div>
              <span className="section-badge">Analytics</span>

              <h2>Quiz Performance</h2>
            </div>

            <button className="view-btn">View Report</button>
          </div>

          {performance.map((quiz, index) => (
            <div key={quiz.quizTitle} className="performance-row">
              <div className="performance-left">
                <div className="performance-icon">{index + 1}</div>

                <div>
                  <h4>{quiz.quizTitle}</h4>

                  <span>Average Accuracy</span>
                </div>
              </div>

              <div className="performance-right">
                <strong>{quiz.averageAccuracy}%</strong>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${quiz.averageAccuracy}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="top-students-card">
          <h2>Quick Actions</h2>

          <div className="action-btn" onClick={() => navigate("/admin/create")}>
            Create Quiz
          </div>

          <div className="action-btn" onClick={() => navigate("/admin/manage")}>
            Manage Quizzes
          </div>

          <div
            className="action-btn"
            onClick={() => navigate("/admin/results")}
          >
            View Results
          </div>

          <div className="action-btn" onClick={() => navigate("/dashboard")}>
            Student Preview
          </div>
        </div> */}

        {/* <div className="top-students-card">
          <h2>Quick Actions</h2>

          <div className="action-grid">
            <div
              className="feature-card"
              onClick={() => navigate("/admin/create")}
            >
              <h3>Create Quiz</h3>
              <p>Create and publish assessments</p>
            </div>

            <div
              className="feature-card"
              onClick={() => navigate("/admin/manage")}
            >
              <h3>Manage Quizzes</h3>
              <p>Edit and activate quizzes</p>
            </div>

            <div
              className="feature-card"
              onClick={() => navigate("/admin/results")}
            >
              <h3>Results</h3>
              <p>View student performance</p>
            </div>

            <div
              className="feature-card"
              onClick={() => navigate("/dashboard")}
            >
              <h3>Student Preview</h3>
              <p>Preview live quiz experience</p>
            </div>
          </div>
        </div> */}

        <div className="top-students-card">
          <div className="section-heading">
            <div>
              <span className="section-badge">Quick Menu</span>

              <h2>Quick Actions</h2>
            </div>
          </div>

          <div className="quick-grid">
            <div
              className="quick-card"
              onClick={() => navigate("/admin/create")}
            >
              <PlusCircle size={30} />

              <h3>Create Quiz</h3>

              <p>Create assessments</p>
            </div>

            <div
              className="quick-card"
              onClick={() => navigate("/admin/manage")}
            >
              <FolderOpen size={30} />

              <h3>Manage</h3>

              <p>Edit quizzes</p>
            </div>

            <div
              className="quick-card"
              onClick={() => navigate("/admin/results")}
            >
              <ChartColumn size={30} />

              <h3>Results</h3>

              <p>Performance</p>
            </div>

            <div
              className="quick-card"
              onClick={() =>
                navigate("/dashboard", { state: { previewMode: true } })
              }
            >
              <Eye size={30} />

              <h3>Preview</h3>

              <p>Student View</p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="batch-card">
        <h2>Batch Analytics</h2>

        {batchAnalytics.map((batch) => (
          <div key={batch.batch} className="batch-row">
            <div>
              <strong>{batch.batch}</strong>
            </div>

            <div>{batch.students} Students</div>

            <div>{batch.attempts} Attempts</div>
          </div>
        ))}
      </div> */}
      <div className="batch-management-card">
        <div className="section-header">
          <div>
            <span className="section-badge">Batch Management</span>

            <h2>Manage Training Batches</h2>
          </div>
        </div>

        <div className="batch-input-row">
          <input
            type="text"
            placeholder="Enter Batch Name"
            value={newBatch}
            onChange={(e) => setNewBatch(e.target.value)}
          />

          <button onClick={addBatch}>Add Batch</button>
        </div>

        <div className="batch-list">
          {batches.map((batch) => (
            <div key={batch.id} className="batch-chip">
              <span>{batch.name}</span>

              <button onClick={() => deleteBatch(batch.id)}>✕</button>
            </div>
          ))}
        </div>
      </div>
      <div className="batch-card">
        <div className="section-header">
          <h2>Batch Analytics</h2>
          <span className="batch-count">{batchAnalytics.length} Batches</span>
        </div>

        {batchAnalytics.map((batch) => (
          <div key={batch.batch} className="batch-row">
            <div className="batch-left">
              <div className="batch-icon">{batch.batch.charAt(0)}</div>

              <div>
                <h3>{batch.batch}</h3>
                <p>Training Batch</p>
              </div>
            </div>

            <div className="batch-stats">
              <div className="batch-stat">
                <span className="stat-label">Students</span>
                <strong>{batch.students}</strong>
              </div>

              <div className="batch-stat">
                <span className="stat-label">Attempts</span>
                <strong>{batch.attempts}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="recent-students-card">
        <h2>Recent Students</h2>

        {recentStudents.map((student) => (
          <div key={student.email} className="student-row">
            <div>
              <h4>{student.name}</h4>
              <p>{student.batch}</p>
            </div>

            <span>{student.email}</span>
          </div>
        ))}
      </div> */}
      <div className="recent-students-card">
        <h2>Recent Students</h2>

        {recentStudents.map((student) => (
          <div key={student.email} className="student-row">
            <div className="student-info">
              <div className="student-avatar">{student.name.charAt(0)}</div>

              <div>
                <h4>{student.name}</h4>
                <span className="batch-badge">{student.batch}</span>
              </div>
            </div>

            <span>{student.email}</span>
          </div>
        ))}
      </div>
      <div className="charts-container">
        {/* <div className="analytics-stats">
          <div>
            <h3>81%</h3>

            <span>Average Accuracy</span>
          </div>

          <div>
            <h3>13</h3>

            <span>Total Attempts</span>
          </div>

          <div>
            <h3>6</h3>

            <span>Students</span>
          </div>
        </div>
        <div className="analytics-header">
          <div>
            <span className="section-badge">Analytics</span>

            <h2>Analytics Overview</h2>

            <p>Quiz attempts, accuracy and engagement</p>
          </div>

          <select className="analytics-filter">
            <option>Last 7 Days</option>

            <option>Last 30 Days</option>

            <option>Last 90 Days</option>
          </select>
        </div> */}

        {/* Performance Chart */}
        <div className="chart-card">
          <h2>Quiz Performance Analytics</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip
                contentStyle={{
                  background: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                }}
              />

              {/* <Bar dataKey="accuracy" fill="#006bff" radius={[10, 10, 0, 0]} /> */}
              <Bar dataKey="accuracy" radius={[12, 12, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={index % 2 === 0 ? "#006bff" : "#fdab23"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}

        <div className="chart-card">
          <h2>Quiz Distribution</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="accuracy"
                nameKey="name"
                outerRadius={110}
                innerRadius={60}
                paddingAngle={4}
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="chart-legend">
            {chartData.map((item, index) => (
              <div key={index} className="legend-item">
                <span
                  className="legend-color"
                  style={{
                    background: COLORS[index % COLORS.length],
                  }}
                ></span>

                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity */}
      {/* <div className="activity-card">
        <h2>Recent Activity</h2>

        <ul className="activity-list">
          {activities.map((activity) => (
            <li key={activity.id}>
              <strong>{activity.studentName}</strong>
              {" completed "}
              <strong>{activity.quizTitle}</strong>

              <span
                style={{
                  float: "right",
                  color: "#6b7280",
                }}
              >
                {activity.accuracy}%
              </span>
            </li>
          ))}
        </ul>
      </div> */}

      <div className="activity-card">
        <div className="section-header">
          <div>
            <span className="section-badge">Live Feed</span>

            <h2>Recent Activity</h2>
          </div>

          <button className="view-btn">View All</button>
        </div>

        {activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <div className="activity-left">
              <div className="activity-avatar">
                {activity.studentName.charAt(0)}
              </div>

              <div>
                <h4>{activity.studentName}</h4>

                <p>
                  Completed
                  <strong> {activity.quizTitle}</strong>
                </p>
              </div>
            </div>

            <div className="activity-right">
              <span className="score-chip">{activity.accuracy}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
