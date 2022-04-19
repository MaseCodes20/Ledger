import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";
import Footer from "../components/Footer";

function WelcomeScreen() {
  return (
    <div className="relative min-h-screen">
      <div className="sticky top-0 flex justify-center items-center bg-[#151426] p-2 z-10 w-full h-fit ">
        <h1 className="text-3xl lg:text-5xl text-[#F26BDC]">
          Welcome To LedgerMe
        </h1>
        <button
          onClick={signIn}
          className="mt-4 ml-3 bg-[#8985F2] rounded-full p-3 hover:bg-[#151426]"
        >
          Sign in
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        <section className="welcomeScreenSections mt-5">
          <div className="welcomeScreenImageContainer">
            <Image
              src="/landingpage/Expense-bills-incomeChartsHomePage.png"
              alt="Expense, bills and income charts"
              layout="fill"
              objectFit="contain"
            />
          </div>

          <div className="welcomeScreenDescription">
            <p>Data visualization of your incomes, expense and goals.</p>
          </div>
        </section>

        <section className="welcomeScreenSections my-20 ">
          <div className="welcomeScreenDescription lg:mx-5">
            <p>
              Fill out the forms on the income, expense and goals page. For each
              income, expense and goal added a card will be displayed.
            </p>
          </div>

          <div className="welcomeScreenImageContainer">
            <Image
              src="/landingpage/IncomePageFormAndCards.png"
              alt="Image of the income page form and cards"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </section>

        <section className="welcomeScreenSections mt-5 mb-10">
          <div className="welcomeScreenImageContainer">
            <Image
              src="/landingpage/GoalsPageCardUpdateForm.png"
              alt="Image of the Goals page card update form"
              layout="fill"
              objectFit="contain"
            />
          </div>

          <div className="welcomeScreenDescription">
            <p>
              You can update or delete each individual card, by clicking on the
              update or delete buttons.
            </p>
          </div>
        </section>
      </div>
      <div className="h-[87px] bg-[#151426] w-full bottom-0">
        <Footer />
      </div>
    </div>
  );
}

export default WelcomeScreen;
