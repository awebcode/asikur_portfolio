import Head from "next/head";
import Link from "next/link";
import styles from "./help.module.css";
import Footer from "@/components/footer/Footer";

export default function Help() {
    return (
      <>
        <div className={styles.container}>
          <Head>
            <title>Help/Center -Asikur Portfolio Website</title>
           

           
          </Head>

          <main className={styles.main}>
            <h1 className={styles.title}>Help Center</h1>

            <section className={styles.section}>
              <h2 className={styles.subtitle}>Getting Started</h2>

              <div className={styles.item}>
                <h3 className={styles.itemTitle}>Creating an Account</h3>
                <p className={styles.itemText}>
                  To create an account, click on the "Sign Up"{" "}
                  <Link href={"/register"}>Sign-Up</Link> button in the top right corner
                  of the page and follow the prompts to enter your information.
                </p>
              </div>

              <div className={styles.item}>
                <h3 className={styles.itemTitle}>
                  Do I need an account to use the website?
                </h3>
                <p className={styles.itemText}>
                  Some features of the website require an account, such as posting a job
                  or purchasing a service. However, browsing available services does not
                  require an account.
                </p>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.subtitle}>Purchasing a Service</h2>

              <div className={styles.item}>
                <h3 className={styles.itemTitle}>How do I purchase a service?</h3>
                <p className={styles.itemText}>
                  To purchase a service, find the service you're interested in and click
                  on the "Purchase" button. Follow the prompts to complete the transaction
                  and provide any necessary information.
                  <span>
                    <b>n.b:</b> before purchase a service ,please contact me.
                  </span>
                </p>
                <p>
                  when you get this message "Thank you for your purchase! If you have any
                  questions, comments, or concerns about your order, please don't hesitate
                  to contact us. Our customer service team is available to assist you and
                  can be reached by email or phone. We want to ensure that you have a
                  positive experience with our products and services, so please let us
                  know if there's anything we can do to help. We appreciate your business
                  and look forward to hearing from you soon!" after hit the purchase
                  button this means for your purchasing successfull.😍
                </p>
              </div>

              <div className={styles.item}>
                <h3 className={styles.itemTitle}>What payment methods are accepted?</h3>
                <p className={styles.itemText}>
                  We accept a variety of payment methods, including credit/debit cards and
                  PayPal. Some sellers may also offer additional payment methods.
                  <span>
                    <b>n.b:</b> it's just a demo, I added a payment system maybe later. If
                    you need a service just create an account and message me or contact me
                    under social media like Facebook, Instagram, Twitter, Github or Gmail.
                  </span>
                </p>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.subtitle}>Using the Website</h2>

              <div className={styles.item}>
                <h3 className={styles.itemTitle}>Browsing Services</h3>
                <p className={styles.itemText}>
                  You can browse available services by clicking on the "Services" tab in
                  the navigation bar. You can also use the search bar to find specific
                  services.
                </p>
              </div>

              <div className={styles.item}>
                <h3 className={styles.itemTitle}>
                  Creating and Interacting with Blog Content
                </h3>
                <p className={styles.itemText}>
                  To create a blog post, click on the "Create Post" button and follow the
                  prompts to enter your post content and any relevant tags. Once your post
                  is published, other users can like, comment, and follow your content. To
                  interact with other users' blog content, simply click on the post to
                  view it and then like or comment on it. You can also follow other users
                  to see their content in your feed. If you want to request to collaborate
                  with another user on a post, you can send them a message and ask about
                  their availability and interest.
                </p>
              </div>

              <div className={styles.item}>
                <h3 className={styles.itemTitle}>How do I filter search results?</h3>
                <p className={styles.itemText}>
                  You can filter search results by price, category, and seller ratings
                  using the filter options on the search results page.
                </p>
              </div>
            </section>
            <section className={styles.section}>
              <h2 className={styles.subtitle}>User Accounts</h2>
              <div className={styles.item}>
                <h3 className={styles.itemTitle}>Creating an Account</h3>
                <p className={styles.itemText}>
                  To create a new account, click on the "Sign Up" button in the top right
                  corner of the page. You will be prompted to enter your email address and
                  choose a password. Once you have entered your information, click the
                  "Sign Up" button to create your account. You will receive a confirmation
                  email with a link to activate your account.
                </p>
              </div>
              <div className={styles.item}>
                <h3 className={styles.itemTitle}>Logging In</h3>
                <p className={styles.itemText}>
                  To log in to your account, click on the "Log In" button in the top right
                  corner of the page. Enter your email address and password, then click
                  the "Log In" button. If you have forgotten your password, click on the
                  "Forgot Password" link and follow the prompts to reset it.
                </p>
              </div>
              <div className={styles.item}>
                <h3 className={styles.itemTitle}>Managing Your Account</h3>
                <p className={styles.itemText}>
                  Once you are logged in, you can manage your account by clicking on the
                  "My Account" button. From there, you can update your profile
                  information, change your password, view your order history, and manage
                  your saved items and preferences. If you need to update your email
                  address or have any other account-related issues, please contact our
                  customer support team for assistance.
                </p>
              </div>
              <div className={styles.item}>
                <h3 className={styles.itemTitle}>Closing Your Account</h3>
                <p className={styles.itemText}>
                  If you need to close your account for any reason, please contact our
                  customer support team. They will be able to assist you with the process
                  and answer any questions you may have.
                </p>
              </div>
            </section>
            <section className={styles.section}>
              <h2 className={styles.subtitle}>Creating a Portfolio</h2>
              <div className={styles.item}>
                <h3 className={styles.itemTitle}>How do I create a portfolio?</h3>
                <p className={styles.itemText}>
                  To create a portfolio, you will need to sign up for an account and log
                  in. Once you're logged in, click on the "Create" button and select
                  "Portfolio". Follow the prompts to add your projects and showcase your
                  skills. You can also customize the design and layout of your portfolio
                  to make it unique to you.
                </p>
              </div>
              <div className={styles.item}>
                <h3 className={styles.itemTitle}>How do I edit my portfolio?</h3>
                <p className={styles.itemText}>
                  To edit your portfolio, log in to your account and click on the "Edit"
                  button on your portfolio page. From there, you can add, remove, or edit
                  projects as well as customize the design and layout of your portfolio.
                </p>
              </div>
              <div className={styles.item}>
                <h3 className={styles.itemTitle}>How do I share my portfolio?</h3>
                <p className={styles.itemText}>
                  To share your portfolio, you can copy the link to your portfolio page
                  and share it on social media or send it to potential employers. You can
                  also embed your portfolio on your personal website or blog.
                </p>
              </div>
            </section>
            <section className={styles.section}>
              <h2 className={styles.subtitle}>Creating a Blog</h2>
              <div className={styles.item}>
                <h3 className={styles.itemTitle}>How do I create a blog post?</h3>
                <p className={styles.itemText}>
                  To create a blog post, log in to your account and click on the "Create"
                  button. Select "Blog Post" and follow the prompts to add your content,
                  images, and tags. You can also customize the design and layout of your
                  blog post to make it visually appealing.
                </p>
              </div>
              <div className={styles.item}>
                <h3 className={styles.itemTitle}>How do I edit my blog post?</h3>
                <p className={styles.itemText}>
                  To edit your blog post, log in to your account and go to the blog post
                  page. Click on the "Edit" button and make the desired changes. You can
                  update the content, images, and tags as well as customize the design and
                  layout of the post.
                </p>
              </div>
              <div className={styles.item}>
                <h3 className={styles.itemTitle}>How do I share my blog post?</h3>
                <p className={styles.itemText}>
                  To share your blog post, you can copy the link to your post page and
                  share it on social media or with your followers. You can also embed your
                  post on your personal website or share it via email newsletter.
                </p>
              </div>
            </section>
            <section className={styles.section}>
              <h2 className={styles.subtitle}>Following Users</h2>
              <div className={styles.item}>
                <h3 className={styles.itemTitle}>How do I follow another user?</h3>
                <p className={styles.itemText}>
                  To follow another user, go to their profile page and click on the
                  "Follow" button. You will receive updates on their latest posts and
                  activity.
                </p>
              </div>
            </section>
          </main>
        </div>
        <Footer />
      </>
    );
}