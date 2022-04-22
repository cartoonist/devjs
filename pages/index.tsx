import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import tw from "tailwind-styled-components";

const Section = tw.div`w-fill h-screen border-t-2 border-b-2 border-gray-200 flex flex-col justify-center items-center text-gray-900 opacity-80 snap-start`;
const Keyword = tw.span`text-blue-800`;
const Code = tw.code`text-blue-800 bg-gray-200 py-2 px-3 block-inline rounded-lg`;

const items = [
  {
    title: "clone",
    prefix: "clone",
    sampleArgs: [
      "amir-s/dev",
      "https://github.com/facebook/react",
      "git@github.com:vercel/next.js.git",
    ],
    description:
      "clone a repository from a remote url to configured local path.",
  },
  {
    title: "cd",
    prefix: "cd",
    sampleArgs: ["amir-s/dev", "fbreact", "next"],
    description: "change current directory to a cloned repository.",
  },
  {
    title: "up",
    prefix: "up",
    sampleArgs: [""],
    description: "install dependencies for the current project.",
  },
  {
    title: "open pr",
    prefix: "open pr",
    sampleArgs: ["", "--new"],
    description:
      "open a browser to create a pull request for the current branch.",
  },
  {
    title: "<command>",
    prefix: "",
    sampleArgs: ["build", "lint", "custom-command", "export", "..."],
    description: "run a custom script for the current project.",
  },
];

interface Props {
  title: string;
  description: string;
  sampleArgs: string[];
  prefix: string;
}

const SampleCommand = ({ title, description, sampleArgs, prefix }: Props) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index) => (index + 1) % sampleArgs.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="text-left self-stretch p-10">
      <div className="">dev {title}</div>
      <div className="text-gray-600">{description}</div>
      <div className="flex flex-col mt-4">
        <div className="text-gray-600">
          <Code>
            $ dev {prefix} {sampleArgs[index]}
          </Code>
        </div>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>DEV</title>
        <meta name="description" content="dev cli for mac" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-h-screen overflow-y-scroll snap snap-y snap-mandatory">
        <Section>
          <h1 className="text-6xl mt-auto">$ dev</h1>
          <div className="opacity-80 mt-2">
            super simple cli; to do <Keyword>git clone</Keyword>,{" "}
            <Keyword>cd</Keyword>, and a few other things.
          </div>
          <div className="mt-8">
            install with <Code>npm i -g amir-s/dev</Code>
          </div>
          <div className="opacity-60 mt-auto mb-10 pb-10">
            ▽ scroll down to see some examples
          </div>
        </Section>
        <Section>
          {items.map((item) => (
            <SampleCommand key={item.title} {...item} />
          ))}
        </Section>
      </main>
    </div>
  );
};
export default Home;
