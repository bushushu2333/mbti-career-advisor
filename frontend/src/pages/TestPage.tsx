import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { ProgressBar } from "../components/ProgressBar";
import { QuizCard } from "../components/QuizCard";
import type { QuizQuestion, MbtiResult, EightDimResult, Profile } from "../types/api";
import { useQuiz } from "../hooks/useQuiz";

const DEFAULT_PROFILE: Profile = {
  name: "",
  gender: "",
  age: "",
  identity: "",
  major: "",
  school: "",
  education: "本科",
  grades: "",
  courses: "",
  experience: "",
  skills: "",
  certificates: "",
  industries: "",
  location: "",
  salary: "",
  workMode: "",
  values: {
    稳定性: 3,
    创新性: 3,
    社会价值: 3,
    独立性: 3,
    高收入: 3,
    工作与生活平衡: 3,
  },
};

export function TestPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // MBTI 测试
  const [mbtiQuestions, setMbtiQuestions] = useState<QuizQuestion[]>([]);
  const mbtiQuiz = useQuiz(mbtiQuestions.length, 4);
  const [mbtiResult, setMbtiResult] = useState<MbtiResult | null>(null);

  // 八维测试
  const [eightDimQuestions, setEightDimQuestions] = useState<QuizQuestion[]>([]);
  const eightDimQuiz = useQuiz(eightDimQuestions.length, 4);
  const [eightDimResult, setEightDimResult] = useState<EightDimResult | null>(null);

  // 档案
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);

  // 加载题目
  useEffect(() => {
    fetch("/api/mbti-test/questions")
      .then((r) => r.json())
      .then((d) => setMbtiQuestions(d.questions));

    fetch("/api/eight-dim-test/questions")
      .then((r) => r.json())
      .then((d) => setEightDimQuestions(d.questions));
  }, []);

  const submitMbti = async () => {
    const res = await fetch("/api/mbti-test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: mbtiQuiz.answers }),
    });
    const data = await res.json();
    setMbtiResult(data);
    setStep(2);
  };

  const submitEightDim = async () => {
    const res = await fetch("/api/eight-dim-test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: eightDimQuiz.answers }),
    });
    const data = await res.json();
    setEightDimResult(data);
    setStep(3);
  };

  const submitProfile = async () => {
    if (!mbtiResult || !eightDimResult) return;

    // 预加载推荐职业
    const careersRes = await fetch(`/api/careers/${mbtiResult.mbti}`);
    const careersData = await careersRes.json();

    const reportData = {
      profile,
      mbtiResult,
      eightDimResult,
      careers: careersData.careers || [],
    };

    localStorage.setItem("mbti_report_data", JSON.stringify(reportData));
    navigate("/report");
  };

  const renderMbtiStep = () => {
    const start = mbtiQuiz.currentPage * mbtiQuiz.questionsPerPage;
    const pageQs = mbtiQuestions.slice(start, start + mbtiQuiz.questionsPerPage);

    return (
      <div className="space-y-6">
        <div className="mb-6">
          <ProgressBar
            current={mbtiQuiz.currentPage + 1}
            total={mbtiQuiz.totalPages}
            label={`MBTI 测评 · 第 ${mbtiQuiz.currentPage + 1} / ${mbtiQuiz.totalPages} 页`}
          />
        </div>

        {pageQs.map((q, idx) => {
          const globalIdx = start + idx;
          return (
            <QuizCard
              key={q.id}
              index={globalIdx}
              total={mbtiQuestions.length}
              text={q.text}
              options={q.options}
              selected={mbtiQuiz.answers[globalIdx]}
              onSelect={(optIdx) => mbtiQuiz.setAnswer(globalIdx, optIdx)}
            />
          );
        })}

        <div className="flex justify-between">
          <button
            onClick={mbtiQuiz.prevPage}
            disabled={mbtiQuiz.currentPage === 0}
            className="rounded-xl border border-slate-600 bg-slate-800 px-6 py-2 text-slate-200 disabled:opacity-40"
          >
            上一页
          </button>
          {mbtiQuiz.currentPage < mbtiQuiz.totalPages - 1 ? (
            <button
              onClick={mbtiQuiz.nextPage}
              className="rounded-xl bg-violet-600 px-6 py-2 font-medium text-white"
            >
              下一页
            </button>
          ) : (
            <button
              onClick={submitMbti}
              disabled={!mbtiQuiz.isComplete}
              className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-2 font-medium text-white disabled:opacity-50"
            >
              提交 MBTI 测评
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderEightDimStep = () => {
    const start = eightDimQuiz.currentPage * eightDimQuiz.questionsPerPage;
    const pageQs = eightDimQuestions.slice(start, start + eightDimQuiz.questionsPerPage);

    return (
      <div className="space-y-6">
        <div className="mb-6">
          <ProgressBar
            current={eightDimQuiz.currentPage + 1}
            total={eightDimQuiz.totalPages}
            label={`八维认知 · 第 ${eightDimQuiz.currentPage + 1} / ${eightDimQuiz.totalPages} 页`}
          />
        </div>

        {mbtiResult && (
          <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-4 text-sm text-violet-200">
            你的 MBTI 初测结果：<strong>{mbtiResult.mbti}</strong>（{mbtiResult.typeName}）
          </div>
        )}

        {pageQs.map((q, idx) => {
          const globalIdx = start + idx;
          return (
            <QuizCard
              key={q.id}
              index={globalIdx}
              total={eightDimQuestions.length}
              text={q.text}
              options={q.options}
              selected={eightDimQuiz.answers[globalIdx]}
              onSelect={(optIdx) => eightDimQuiz.setAnswer(globalIdx, optIdx)}
            />
          );
        })}

        <div className="flex justify-between">
          <button
            onClick={() => setStep(1)}
            className="rounded-xl border border-slate-600 bg-slate-800 px-6 py-2 text-slate-200"
          >
            返回 MBTI
          </button>
          {eightDimQuiz.currentPage < eightDimQuiz.totalPages - 1 ? (
            <button
              onClick={eightDimQuiz.nextPage}
              className="rounded-xl bg-violet-600 px-6 py-2 font-medium text-white"
            >
              下一页
            </button>
          ) : (
            <button
              onClick={submitEightDim}
              disabled={!eightDimQuiz.isComplete}
              className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-2 font-medium text-white disabled:opacity-50"
            >
              提交八维测评
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderProfileStep = () => (
    <div className="space-y-6">
      <div className="mb-6">
        <ProgressBar current={3} total={3} label="详细档案（3/3）" />
      </div>

      {mbtiResult && eightDimResult && (
        <div className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5 md:grid-cols-2">
          <div>
            <div className="text-sm text-slate-400">MBTI 类型</div>
            <div className="text-2xl font-bold text-violet-300">{mbtiResult.mbti}</div>
            <div className="text-sm text-slate-300">{mbtiResult.typeName}</div>
          </div>
          <div>
            <div className="text-sm text-slate-400">八维主导/辅助</div>
            <div className="text-2xl font-bold text-fuchsia-300">{eightDimResult.dominant} / {eightDimResult.auxiliary}</div>
            <div className="text-sm text-slate-300">推断类型 {eightDimResult.mbti}</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {renderField("姓名", "name", profile.name, (v) => updateProfile("name", v))}
        {renderField("性别", "gender", profile.gender, (v) => updateProfile("gender", v))}
        {renderField("年龄", "age", profile.age, (v) => updateProfile("age", v), "例如：22")}
        {renderSelect("当前身份", "identity", profile.identity, (v) => updateProfile("identity", v), ["", "在校大学生", "应届毕业生", "职场新人", "在职人士", "转行者"])}
        {renderField("学校", "school", profile.school, (v) => updateProfile("school", v))}
        {renderField("专业", "major", profile.major, (v) => updateProfile("major", v))}
        {renderSelect("学历", "education", profile.education, (v) => updateProfile("education", v), ["高中", "大专", "本科", "硕士", "博士"])}
        {renderField("成绩/绩点", "grades", profile.grades, (v) => updateProfile("grades", v), "例如：85/100 或 3.5/4")}
        {renderTextarea("相关课程", "courses", profile.courses, (v) => updateProfile("courses", v), "例如：心理学、数据分析、市场营销")}
        {renderTextarea("实习/项目经历", "experience", profile.experience, (v) => updateProfile("experience", v))}
        {renderField("技能", "skills", profile.skills, (v) => updateProfile("skills", v), "例如：Python、PPT、文案写作")}
        {renderField("证书", "certificates", profile.certificates, (v) => updateProfile("certificates", v), "例如：CET-6、教师资格证")}
        {renderField("期望行业", "industries", profile.industries, (v) => updateProfile("industries", v), "例如：互联网、教育、金融")}
        {renderField("期望工作地点", "location", profile.location, (v) => updateProfile("location", v))}
        {renderField("期望薪资范围", "salary", profile.salary, (v) => updateProfile("salary", v), "例如：10-15K")}
        {renderSelect("期望工作模式", "workMode", profile.workMode, (v) => updateProfile("workMode", v), ["", "全职坐班", "远程办公", "混合办公", "自由职业", "创业"])}
      </div>

      <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5">
        <h3 className="mb-4 font-semibold text-slate-200">职业价值观（1-5 分，越重要分越高）</h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {Object.entries(profile.values).map(([key, val]) => (
            <div key={key}>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-300">{key}</span>
                <span className="text-violet-300">{val}</span>
              </div>
              <input
                type="range"
                min={1}
                max={5}
                step={1}
                value={val}
                onChange={(e) => updateValue(key, parseInt(e.target.value))}
                className="w-full accent-violet-500"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setStep(2)}
          className="rounded-xl border border-slate-600 bg-slate-800 px-6 py-2 text-slate-200"
        >
          返回八维
        </button>
        <button
          onClick={submitProfile}
          disabled={!profile.name || !profile.major}
          className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 font-bold text-white disabled:opacity-50"
        >
          生成 AI 职业报告
        </button>
      </div>
    </div>
  );

  function updateProfile(field: keyof Profile, value: string) {
    setProfile((prev) => ({ ...prev, [field]: value }));
  }

  function updateValue(key: string, value: number) {
    setProfile((prev) => ({
      ...prev,
      values: { ...prev.values, [key]: value },
    }));
  }

  function renderField(
    label: string,
    id: string,
    value: string,
    onChange: (v: string) => void,
    placeholder?: string
  ) {
    return (
      <div className="space-y-1">
        <label htmlFor={id} className="text-sm text-slate-400">{label}</label>
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-2 text-slate-100 outline-none focus:border-violet-500"
        />
      </div>
    );
  }

  function renderSelect(
    label: string,
    id: string,
    value: string,
    onChange: (v: string) => void,
    options: string[]
  ) {
    return (
      <div className="space-y-1">
        <label htmlFor={id} className="text-sm text-slate-400">{label}</label>
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-2 text-slate-100 outline-none focus:border-violet-500"
        >
          {options.map((o) => (
            <option key={o} value={o}>{o || "请选择"}</option>
          ))}
        </select>
      </div>
    );
  }

  function renderTextarea(
    label: string,
    id: string,
    value: string,
    onChange: (v: string) => void,
    placeholder?: string
  ) {
    return (
      <div className="space-y-1 md:col-span-2">
        <label htmlFor={id} className="text-sm text-slate-400">{label}</label>
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-2 text-slate-100 outline-none focus:border-violet-500"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 pb-20">
      <div className="mx-auto max-w-3xl">
        <Header />

        <div className="mb-8 flex justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2.5 w-2.5 rounded-full ${
                s === step ? "bg-violet-500" : s < step ? "bg-violet-300" : "bg-slate-700"
              }`}
            />
          ))}
        </div>

        <div className="rounded-3xl border border-slate-700/50 bg-slate-900/40 p-6 md:p-8">
          {step === 1 && renderMbtiStep()}
          {step === 2 && renderEightDimStep()}
          {step === 3 && renderProfileStep()}
        </div>
      </div>
    </div>
  );
}
