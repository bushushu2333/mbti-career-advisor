#!/usr/bin/env python3
# coding: utf-8
"""
MBTI Career Report Generator v2.0 (2026-06-23)
复现原项目功能，迁移 API 到火山方舟 Coding Plan（Anthropic 协议）。
原功能：读取 MBTI 职业映射表 + 用户信息 → 调用 LLM 生成职业发展报告。
"""

import csv
import os
import sys
from pathlib import Path


class MBTICareerMatch:
    """从 CSV 加载 MBTI→职业映射。"""

    def __init__(self, csv_file):
        self.mbti_careers = self._load(csv_file)

    def _load(self, csv_file):
        careers = {}
        with open(csv_file, newline="", encoding="utf-8") as f:
            reader = csv.reader(f)
            headers = next(reader)
            for row in reader:
                for i, mbti in enumerate(headers):
                    mbti = mbti.strip()
                    if not mbti:
                        continue
                    careers.setdefault(mbti, [])
                    if i < len(row):
                        val = row[i].strip()
                        if val:
                            careers[mbti].append(val)
        return careers

    def get_careers_for_mbti(self, mbti):
        return self.mbti_careers.get(mbti, [])


def build_prompt(profile, careers):
    """构造给 LLM 的 prompt。"""
    name = profile.get("name", "the person")
    mbti = profile.get("mbti", "")
    major = profile.get("major", "")
    grades = profile.get("grades", "")
    hobbies = ", ".join(h.strip() for h in profile.get("hobbies", "").split(",") if h.strip())
    career_advice = ", ".join(careers)

    prompt = (
        f"Based on the profile information of {name}, whose MBTI type is {mbti}, "
        f"major in {major}, current grades are {grades}, and hobbies include {hobbies}, "
        f"provide a detailed and personalized career development analysis. "
        f"Consider the following career advice: {career_advice}."
    )
    return prompt


def generate_report(prompt, model=None, max_tokens=1000):
    """
    调用火山方舟 Coding Plan。
    用户给的是 Anthropic 协议参数，但当前环境 anthropic SDK 0.18.1 与 httpx 存在
    proxies 参数兼容性问题。方舟同时支持 OpenAI 协议，因此使用 OpenAI SDK
    访问 /api/coding/v3 端点，复用同一套 API Key 与模型名。
    """
    from openai import OpenAI

    # 兼容用户给的 Anthropic 命名，也兼容 OpenAI 命名
    api_key = os.environ.get("OPENAI_API_KEY") or os.environ.get("ANTHROPIC_AUTH_TOKEN")
    base_url = os.environ.get(
        "OPENAI_BASE_URL",
        os.environ.get("ANTHROPIC_BASE_URL", "https://ark.cn-beijing.volces.com/api/coding")
        + "/v3",
    )
    model = model or os.environ.get("OPENAI_MODEL") or os.environ.get(
        "ANTHROPIC_MODEL", "deepseek-v4-pro"
    )
    timeout_ms = int(os.environ.get("API_TIMEOUT_MS", "300000"))

    if not api_key:
        raise ValueError("请设置环境变量 ANTHROPIC_AUTH_TOKEN 或 OPENAI_API_KEY")

    client = OpenAI(
        api_key=api_key,
        base_url=base_url,
        timeout=timeout_ms / 1000,
    )

    response = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
        max_tokens=max_tokens,
        top_p=1.0,
    )
    return response.choices[0].message.content


def main():
    base_dir = Path(__file__).parent
    csv_path = base_dir / "MBTI Job Advise.csv"

    if not csv_path.exists():
        print(f"未找到职业映射表: {csv_path}")
        sys.exit(1)

    matcher = MBTICareerMatch(csv_path)

    # 复现原项目案例：INFJ-A 金融专业学生 Jia
    profile = {
        "name": "Jia",
        "mbti": "INFJ-A",
        "major": "Finance",
        "grades": "85/100",
        "hobbies": "reading",
    }

    print("=" * 60)
    print("MBTI Career Report Generator v2.0 — 功能复现")
    print("=" * 60)
    print(f"用户档案: {profile}")

    careers = matcher.get_careers_for_mbti(profile["mbti"])
    print(f"\n{profile['mbti']} 推荐职业: {careers}")

    if not careers:
        print("未找到匹配职业，无法生成报告。")
        sys.exit(1)

    prompt = build_prompt(profile, careers)
    print(f"\nPrompt:\n{prompt}\n")

    print("=" * 60)
    print("正在调用模型生成报告...")
    print("=" * 60)

    try:
        report = generate_report(prompt)
        print("\nCareer Development Report:")
        print("-" * 60)
        print(report)
    except Exception as e:
        print(f"\n生成报告失败: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
