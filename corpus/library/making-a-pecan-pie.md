---
title: "Making a Pecan Pie" (Sukumar, Metoyer & He, CSCW 2018)
---

# Making a Pecan Pie: Understanding and Supporting the Holistic Review Process in Admissions (Sukumar, Metoyer & He, Notre Dame)

_Recovered from an upload-processing archive originally named `10284843.pdf`. Text below is the extracted page text._


---

## Page 1

169
Making a Pecan Pie: Understanding and Supporting The
Holistic Review Process in Admissions
POORNA TALKAD SUKUMAR, University of Notre Dame, USA
RONALD METOYER, University of Notre Dame, USA
SHUAI HE, University of Notre Dame, USA
Holistic reviews are a common practice employed by colleges in the United States to make admissions decisions.
It is an individualized review process where reviewers assess an applicant’s potential by considering various
criteria including academic metrics, adversities faced, and personal attributes. While the factors considered in
such reviews are broadly known, a detailed walk-through of the process is absent in the existing literature.
This is important to understand what is done in practice and to identify opportunities for technological
interventions to support the complex and changing process. We employed cognitive task analysis and a socioorganizational approach to understand the holistic review process at a highly-selective, private university. We
found the process to be nuanced and complex owing its complexity both to the numerous variables involved
and the reviewers’ thought processes. We present a rigorous, structured characterization of the review process
and suggest possible leverage points for applying visualization decision-support tools.
CCS Concepts: • Human-centered computing → Empirical studies in HCI;
Additional Key Words and Phrases: Holistic college admissions; cognitive bias; decision making; information
visualization;
ACM Reference Format:
Poorna Talkad Sukumar, Ronald Metoyer, and Shuai He. 2018. Making a Pecan Pie: Understanding and
Supporting The Holistic Review Process in Admissions. Proc. ACM Hum.-Comput. Interact. 2, CSCW, Article 169
(November 2018), 22 pages. https://doi.org/10.1145/3274438
1 INTRODUCTION
“My boy, you’ve got to know the shape of the river perfectly. It is all there is left to
steer by on a very dark night.”
—Mark Twain, Life on the Mississippi
Bowen and Bok use Mark Twain’s "the shape of the river" analogy above in their book of the
same name to describe the complexity of the college admissions process in the United States
of America [9]. To navigate and understand the admissions process, one must understand the
numerous variables, features, caveats, and policies that the process involves which is akin to the
knowing all the shape variations of the ∼1,200-mile-river.
The undergraduate college admissions process is central to the progress of the country and
has signifcant social, economic, and political implications. It has been a topic of continual and
consequential debate for many decades now. Even recently, Harvard University has come under
Authors’ addresses: Poorna Talkad Sukumar, University of Notre Dame, Notre Dame, IN, 46556, USA, ptalkads@nd.edu;
Ronald Metoyer, University of Notre Dame, Notre Dame, IN, 46556, USA, rmetoyer@nd.edu; Shuai He, University of Notre
Dame, Notre Dame, IN, 46556, USA, she1@nd.edu.
Permission to make digital or hard copies of all or part of this work for personal or classroom use is granted without fee
provided that copies are not made or distributed for proft or commercial advantage and that copies bear this notice and
the full citation on the frst page. Copyrights for components of this work owned by others than ACM must be honored.
Abstracting with credit is permitted. To copy otherwise, or republish, to post on servers or to redistribute to lists, requires
prior specifc permission and/or a fee. Request permissions from permissions@acm.org.
© 2018 Association for Computing Machinery.
2573-0142/2018/11-ART169 $15.00
https://doi.org/10.1145/3274438
Proceedings of the ACM on Human-Computer Interaction, Vol. 2, No. CSCW, Article 169. Publication date: November 2018.


---

## Page 2

169:2 P.T. Sukumar et al.
the scrutiny of the Justice Department on the grounds of discrimination in admissions [11]. A good
deal of such debate and unrest stem from colleges and universities’ lack of transparency in their
admissions policies and practices.
Additionally, the dynamics of undergraduate admissions are changing in universities and colleges
throughout the country. Generally speaking, these changes include an increase in the number of
applications, more diversity in the the demographic composition of applicants, increased cost of
higher education, and a decrease in students’ ability to pay for undergraduate tuition [36]. Colleges
are forced to take into account and adapt their admissions policies to these changes. Adapting to
these changes may require changing their decision-making strategies and fnding ways to expedite
the process without compromising quality.
There is a need, especially at this present time, to address issues of transparency and make
what is known about admissions processes refect what is done in practice. Understanding the
processes through observations and interviews can not only enhance transparency but also help in
identifying opportunities for technological interventions. These interventions can assist colleges in
adapting to the shifting dynamics and also improve their review processes. This paper presents
frst steps in these directions.
The admissions process is typically non-trivial, hard to characterize, and mainly, varies from
college to college. Broadly speaking, admissions processes at colleges can be distinguished based
on three aspects: (i) selectivity (ranging from all-inclusive to highly-selective), (ii) type of review
(ranging from largely objective to subjective or holistic reviews), and (iii) College missions and
enrollment goals [28, 36].
Holistic reviews are generally complex and subjective in nature. Admissions ofcers review
every application in context [28] by considering factors such as the applicant’s high school, family
background, adversities faced, grade trends, non-academic accomplishments and personal qualities
of the applicant. Non-academic aspects may include community service, music ability, special
talents, and leadership skills.
We were interested in studying how admissions ofcers collectively make undergraduate admissions recommendations at a highly-selective, private university that employs a holistic review
process. Understanding the collective process also required understanding its constituent individual
contributions. In particular, we were interested in studying the individual ofcers’ knowledge and
application-review activities, i.e. awareness [17], and the distribution of applications among the
ofcers for review purposes and their coordination, i.e. articulation work [39], which are forerunners
to the cooperative, collaborative work setting.
In this paper, we employed cognitive task analysis (CTA) and a socio-organizational approach
to characterize how the admissions ofcers individually and collectively review applications at
this university. We collected data by conducting situated interviews and observations. We present
a rigorous, structured characterization of the process and suggest leverage points within the
characterization where visualization decision-support tools might be applied.
To the best of our knowledge, this is a largely unexplored area in Computer-Supported Cooperative Work (CSCW) and Human-Computer Interaction (HCI). The primary goal of the work
presented is to provide a descriptive account of the application-review process at this university
resulting from our observations and interviews. While we provide implications for visualization
design (in form of leverage points which more naturally follow CTA approaches [38]), our characterizations do not encompass the gathering of any specifc design requirements [15]. As such,
they can be solely used to gain a better understanding of the process and also enable others to see
alternative approaches and ideas for technological innovation.
Proceedings of the ACM on Human-Computer Interaction, Vol. 2, No. CSCW, Article 169. Publication date: November 2018.


---

## Page 3

Making a Pecan Pie 169:3
2 BACKGROUND
We discuss a few examples of the myriad studies available on undergraduate admissions in the
United States and then present the foundational aspects of holistic reviews and demonstrate why
they can be challenging.
2.1 Literature on Admissions
There are many studies concerning admissions processes in the United States and they have
provided us with the much-needed sociological underpinnings to understand the process. The
materials we referred to include sociological research articles and books, popular nonfction books,
news articles, and numerous online blogs, and Opinion Editorials (Op-eds).
The College Board documents [1, 36] are some of the earliest documents which present a
taxonomy of the various decision-making models in present-day admissions and list the factors
generally considered in holistic reviews. These documents were results of College Board meetings
involving approximately 50 admissions directors, deans and researchers from various colleges in
the United States. Jerome Lucido, who contributed to the College Board documents, elaborates on
the above taxonomy and the implications of various factors in admissions decisions in his article
[28]. These articles were aimed at communicating to the public how and why admissions decisions
are made as well as to create foundational material to spur future discussions on admissions.
Signifcant research in higher-education and sociology domains has been conducted to study
the pros and cons of various admissions policies which serve to inform the practices employed in
colleges [8–10]. For example, Bowen and Bok champion afrmative action and provide empirical
evidence proving the efectiveness of race-sensitive policies [9]. Camara and Schmidt found signifcant diferences in standardized-test performances between ethnic and racial groups which were
largely explained by the difering socio-economic statuses between the groups [10].
Popular single-author nonfction books, such as Jacques Steinberg’s The Gatekeepers [43] and
Daniel Golden’s The Price of Admissions [20], have been written for the public interest and attempt
to demystify the admissions black box. They report various debatable admissions practices in
certain universities and employ a sensational writing style. Jacques Steinberg writes about his
observations of the admissions process at Wesleyan University for almost one year in his book, The
Gatekeepers [43] and Daniel Golden’s The Price of Admissions [20] is the result of two years’ worth
of investigative journalism and interviews with several people including students and admissions
ofcers.
There are many online blogs and articles to inform potential applicants and also the general
public of how admissions decisions are made in various colleges. Some of these articles are written
by people working in admissions themselves. Examples include the Vanderbilt admissions blog [4]
and the now-archived The Choice blog by NYTimes [3].
As we can see, the details on how admissions decisions are made are scattered across many
resources. The considerations for admission specifc to a university and a structured walk-through
of its application-review process, as done in this paper, is lacking in existing literature. While all
of these resources are concerned with the social aspects of the process, we are also interested
in studying the process from a technological standpoint. The reviewers are our user population
of interest and we identify opportunities to support their decision making through the use of
information visualization tools. We indicate the areas addressable by visualization tools within our
characterization of the review process.
Proceedings of the ACM on Human-Computer Interaction, Vol. 2, No. CSCW, Article 169. Publication date: November 2018.


---

## Page 4

169:4 P.T. Sukumar et al.
2.2 Holistic Review Process: Importance and Complexity
B.A. Thresher states in his 1966 book, College Admissions and the Public Interest, that "the process
of admission to college is more sociologically than intellectually determined" [46](p. 1) and this
largely holds even today [28]. Students from high-income families are generally provided with
more opportunities and high-quality academic preparation. Studies have shown that there is a
strong positive correlation between students’ test scores and the socioeconomic statuses of their
families [10]. Students from low-income families, on the other hand, may receive inadequate
academic training and may go through additional hardships as a result of trying to make ends
meet. When students with such diverse backgrounds, diferent talents, dissimilar experiences, and
disproportionate family incomes contend to attend the same college, how are admissions decisions
made? Specifcally, how are admissions decisions made that uphold American egalitarian notions,
provide equitable opportunity, and promote upward mobility?
Defning merit becomes non-trivial in these scenarios and objective measures such as test scores
and high-school GPAs alone cannot be used to judge students’ capabilities. For example, a student
from a moderately afuent family who ranks in the top 5% of his class can be said to have merit
and the same can be said of a student who ranks in the top 15% of her class and is a frst-generation
student. Evaluating applications would then require considering every application individually
and assessing the applicant’s accomplishments and performance in relation to the opportunities
presented to the applicant [28]. The holistic review process intrinsically embodies this practice and
endeavors to provide a just means to make admissions decisions.
While objective reviews would be far from fair, true holistic reviews are hard to implement in
practice. Since every application presents a unique case, the downside to holistic reviews is the lack
of a defnite solution path and hence a systematic and uniform review method. The holistic review
processes employed in colleges are not arbitrary, however, and the reviewers are usually guided by
policies that draw on the college’s mission and goals in their decision making. As a result, there are
predetermined attributes the reviewers look for in the applications but the interpretations of many
of these attributes and the associations made depend on the discretion of individual reviewers.
Additionally, some of the attributes considered may not predict an applicant’s competence or some
attributes may be given undue consideration in the review process. Hence this trade-of, while
still retains contextualizing applicants, may also result in difering practices among colleges and
inconsistently-subjective reviews within colleges.
The difering practices result from difering college missions and enrollment goals for constructing
the incoming class which depend on several factors including the college’s funding type, i.e. public
or private, the educational programs ofered and its societal role [28]. One of the admissions ofcers
we interviewed remarked,
“[This university] has been asked to make a pecan pie. [A diferent university] cares
about making a pumpkin pie. Every university has its own priorities and concerns.”
3 METHOD
Holistic reviews can be defned as complex tasks performed by reviewers who are subject-matter
experts (SMEs) [12]. Complex tasks require the use of both conscious and automated knowledge of
experienced SMEs in performing tasks that can persist for many hours or days [12]. Therefore, to
understand how the reviewers evaluate applications and make recommendations, we decided to
elicit their cognitive processes and knowledge underlying their task performance.
As outlined by Clark et al. [12], we proceeded by collecting preliminary knowledge about the
application-review process at the university through document analysis (as described in Section 2)
and an informal discussion with a senior member at the admissions department. We then identifed
Proceedings of the ACM on Human-Computer Interaction, Vol. 2, No. CSCW, Article 169. Publication date: November 2018.


---

## Page 5

Making a Pecan Pie 169:5
the tasks of interest in the review process and the knowledge-elicitation methods to apply to
them. We used (i) a process-tracing technique [13], which is a type of cognitive task analysis
(CTA), to capture the reviewers’ cognitive processes when reviewing applications, both individually
and collectively and (ii) a socio-organizational approach to characterize the reviewers’ roles and
requirements within the university and admissions context. These complementary approaches
were used to fully understand and organize our knowledge about the review process.
3.1 Preliminary-knowledge collection
We began by collecting a wide variety of admissions-related resources to familiarize ourselves
with the problem domain as described in Section 2 and we referred to these resources throughout
our study. We then conducted an informal discussion with a senior member at the admissions
department at the university prior to conducting our study. This discussion gave us a very highlevel view of the admissions process and helped us structure our study. The university receives
approximately 20,000 applications for undergraduate study every year and has an acceptance rate
of less than 20%. The review process at this university is very similar to the process described in
Case #1 (p. 17) of the College Board report [1] and we briefy describe it below.
The reviewers evaluate applications from the geographic areas assigned to them. A portion
of the applications also receive second reviews by diferent reviewers. Committee meetings take
place after all the individual reviews of applications have been completed and are where most of
the previously-reviewed applications are discussed and recommendations are made on undecided
applications. Reviewers present applications from their geographic areas during the meetings
and the committee discusses these applications. The last stage of the process involves viewing
the incoming class as a whole and ensuring that it is right-sized and well-rounded as well as
well-lopsided. Well-lopsided refers to demonstrating excellence in particular activities as opposed
to all-round excellence.
3.2 Data Collection and Analysis
3.2.1 Cognitive Task Analysis. We identifed the individual application reviews and the collective
reviews during committee meetings to be the focus of our CTA. We used the CTA method of process
tracing to observe and collect verbal reports [13] from the reviewers as they concurrently reviewed
applications both individually and collectively during committee meetings.
Process tracing through a think-aloud protocol can be used to capture the combined declarative
and procedural knowledge underlying experts’ task performance. SMEs typically combine their
declarative (or conscious or conceptual) and procedural (or unconscious or automated) knowledge
in performing complex tasks [12]. While they can reasonably articulate their declarative knowledge when methods employing recall are used, they cannot consciously recall or articulate their
procedural knowledge which, however, can be "elicited" via think-aloud in process tracing.
We used our observation notes and the collected reviewers’ verbal reports to make inferences
about the (i) the various application attributes considered and the cognitive processes of the reviewers associated with them during individual reviews, (ii) the distributed cognition during committee
meetings involving the presentation and discussion of applications, and (iii) the materialities of
the representations of applications and reviewers’ evaluation records. Materialities refer to the
properties of information representations which infuence and shape the processes in which they
are used [16, 34].
3.2.2 Socio-organizational approach. We were also interested in learning about the potential
factors contributing to the reviewers’ experience and knowledge they apply in evaluating applications. Hence we also conducted semi-structured interviews as part of the socio-organizational
Proceedings of the ACM on Human-Computer Interaction, Vol. 2, No. CSCW, Article 169. Publication date: November 2018.


---

## Page 6

169:6 P.T. Sukumar et al.
approach [14] (p. 450-474) to understand the role of our stakeholders, i.e. reviewers within their
organizational context and to identify their requirements by querying them about their activities
in the admissions process and the challenges they face.
3.2.3 Data collection. We collected information for analysis using observations and interviews
to uncover as much detail about the process and reviewer behavior as possible. We conducted
semi-structured interviews with four reviewers followed by observations of each of them reviewing
a sample application using a think-aloud protocol. We also passively observed roughly 2 hours of a
mock committee meeting session.
Since the admissions ofcers were concerned about the collection of identifying information
and also due to the sensitivity of the information being collected, we only recorded notes (typed
on laptops) during both interviews and observations and no audio/video was recorded. Given
these limitations, we focused only on the tasks of interest and did not take notes of deep data
such as the times for each remark in their conversations or gaze behavior. During the observation
sessions, we, a group of three researchers, collectively recorded both their verbal reports verbatim
and our observations of how they performed the tasks. During the interviews, we recorded our
understandings and interpretations of their responses [21].
In addition to the data collected, we also referred to external documentation, such as the Common
Application [2], which served as supporting material to understand the reviewer tasks and their
interactions with the current software used for reviewing applications.
3.2.4 Data analysis and verification. We coded the data collected through the observations and
verbal reports to build the task decompositions of the individual review process and the committeemeeting-proceedings and summarize the associated reviewers’ cognitive processes. We presented
the resulting characterizations to the admissions ofcers for them to verify the accuracy of the
recorded application attributes and corresponding cognitive actions and made revisions based on
their feedback. We used Afnity Diagramming [21] to organize the information collected from the
interviews pertaining to the socio-organizational aspects of reviewer roles and requirements.
3.2.5 Formating CTA results. There can be various end goals of CTA, such as to build documents
for training purposes or to transfer the expertise elicited to other tasks, and depending on the goal,
the CTA results are formatted accordingly to present, for example, decision-making models or
detailed descriptions of all the necessary actions to perform a task [12].
Our goal in performing the CTA, however, was to generate a descriptive report to provide a
thorough understanding of the application-review process and make apparent opportunities for
supporting the process through technological interventions. To this end, we present our CTA
results in the format of structured characterizations of the process outlining the various application
attributes, the cognitive tasks reviewers perform with respect to each of them, and the material
properties of the software artifacts currently used in the review process. These characterizations
helped us understand the current practices, identify their drawbacks, and suggest potential leverage
points for applying visualization tools.
3.3 Procedure
Following approval from the Institutional Review Board, we contacted admissions ofcers who
reviewed incoming applications for undergraduate admissions at this university. We contacted
them by an e-mail describing the study. All the interviews and observations were conducted in
the workplace of the reviewers and with the desktop systems they currently use for reviewing
applications. After they signed the consent form, they were frst interviewed where we asked
them to elaborate on their roles and responsibilities and the challenges (both specifc to them and
Proceedings of the ACM on Human-Computer Interaction, Vol. 2, No. CSCW, Article 169. Publication date: November 2018.


---

## Page 7

Making a Pecan Pie 169:7
general) in the admissions process. We also asked them about the tools and software they used
while reviewing applications.
Following the interviews, we observed them while they reviewed a sample application. The
reviewers were asked to think-aloud and state the application attributes they were looking at,
their associated thought processes, how and what notes they recorded and the rationales for
their recommendations. We asked them clarifcation questions during and post observation. The
individual interviews and observations each lasted between 30 minutes to an hour.
Five admissions ofcers were present and roughly 16 applications were presented and discussed
during the mock committee meeting session we observed. We observed how and what materials and
tools presenters used to summarize an application, the activities of the non-presenting members in
the committee and how the members discussed the applications. Following the observation, we
asked them clarifcation questions. Our data collection was intermixed with analysis and we used
the data collected in the initial interviews to formulate new questions and refne our focus for the
later ones.
3.4 Participants
We did not collect the age and gender information of the reviewers who took part in our study.
Most of the reviewers are the university’s alumni and hence they better understand the university’s
mission and what it stands for. Their experiences as reviewers ranged from 1 year to more than 30
years. We compensated each of the reviewers we interviewed with a $50 gift card for participating
in our study.
4 FINDINGS AND CHARACTERIZATIONS
We present our contributions slightly unconventionally. We begin by presenting the themes organizing reviewer roles and requirements in the process. We then prematurely discuss our key
fndings and leverage points identifed for applying visualization tools. This is done so that we could
make suggestions for visualization techniques in multiple places within the characterizations of the
review process discussed later. We use the terms reviewers and admissions ofcers interchangeably
throughout and numbered headings denote sequence/order of events.
4.1 Reviewer roles and requirements
We focus on the reviewers here – their roles, activities, and the challenges they face during the
admissions process. The themes presented help us understand the big picture and how the various
components are interlinked in the admissions process. For instance, we learned that a large part
of the background knowledge that reviewers use in making recommendations during application
reviews is derived from their visits to high schools, prior to the institution’s receiving of applications.
4.1.1 Geographic areas. Reviewers are assigned non-overlapping geographic areas or territories
within and/or outside the US. They are each responsible for reviewing the applications received
from their respective areas. The reviewers generally have frst-hand knowledge about the high
schools in their geographic area and their comments for an application from their area are weighted
more heavily than the comments from second reviewers who are generally not familiar with the
area.
4.1.2 Travel, Recruitment, and Yield. The admissions process, from a reviewer’s perspective, can
be seen as consisting of three seasons - travel or recruitment season, reviewing applications, and
lastly, the "yield" season.
Reviewers visit high schools in their geographic areas during September, October, and part of
November. Reviewers fnd travelling interesting and consider it as "research." They fnd meaningful
Proceedings of the ACM on Human-Computer Interaction, Vol. 2, No. CSCW, Article 169. Publication date: November 2018.


---

## Page 8

169:8 P.T. Sukumar et al.
insights about the school contexts, economic statuses of the students, and opportunities provided
to the students which they use to evaluate applications. They also interact with students during
these visits and they often remember certain students they’ve interacted with when reviewing
their applications later on.
Reviewers also act as recruiters and try to get the best students in their area to apply to the
university. This is done by the reviewers consulting high-school databases as well as through
contacts from the individual schools.
Post-application-reviews, i.e. the "yield" season, reviewers interact with potential incoming
students and invite students to visit the university campus.
4.1.3 Reviewer Challenges.
• Extra hours of work: One of the main challenges that the reviewers face is the sheer volume
of the applications and the limited time to review them. This challenge often results in the
reviewers putting in extra hours of work. The reviewers each review between 1000-2000
applications in a time period of roughly 4 months. Reviewers are also subject to "interruptions"
while reviewing applications, such as receiving numerous emails from applicants or people
associated with the applicants and these interruptions prolong their application reviews.
• Demands of holistic reviews: The very nature of holistic reviews adds a considerable burden on
the reviewers. These reviews entail looking beyond students’ academic scores, and using one’s
experience and background knowledge to fnd explanations and assess the applicants based on
numerous factors. The reviewers have to "read between the lines" to glean more information
than what is presented in the applications. When the number of applications increases and
there are more contenders for each spot, reviewers have to be more selective. Reviewers
are also constantly introspective to ensure they are making reasonable recommendations
and when they are doubtful about their recommendations, they put those applications in
the queue for second reviews. There are also challenges that are specifc to certain kinds of
applications, e.g., international applications.
• Arguing for recommended applicants during committee meetings: Reviewers are very "invested"
in their work and they try to picture themselves in the applicant’s shoes while reviewing an
application. This investment helps them during the committee meetings when they are faced
with the hard task of arguing for their preferred students and convincing the committee why
they should be admitted.
• Balancing various enrollment expectations: In addition to reviewing individual applications,
some of the reviewers also have to view the applications collectively. They attempt to balance
various enrollment expectations, such as geographic diversity, skills diversity, majors, special
talents, and life experiences, in constructing a well-rounded class.
4.2 Leverage points for applying decision-support tools
The materialist perspective centers on how the ways in which information is represented "constrain,
enable, limit, and shape" the purposes for which it is used [16]. For example, the currently-used
digital applications shape the review process diferently from the paper-based applications that
were formerly popular. The material consequences extend beyond the diferences in how these
representations enable reviewing, sharing, storing, and communication; the introduction of digital
applications also resulted in a substantial increase in the number of applications received by colleges
leading them to be more "selective" and alter their reviewing strategies [24].
We studied the materialities of the digital formats used for applications and reviewers’ evaluations
and how they shape the current review practices. We discuss the materialities of the specifc formats
used within the process characterizations presented in Sections 4.3 and 4.4. We found that the
Proceedings of the ACM on Human-Computer Interaction, Vol. 2, No. CSCW, Article 169. Publication date: November 2018.


---

## Page 9

Making a Pecan Pie 169:9
formats used are more representational than interaction-based and do not adequately support the
cognitive processes of the reviewers. In particular, we found that the largely static representations
did not sufciently aford (i) comparisons and other introspective tasks performed by the reviewers,
(ii) recording of the rationales for the reviewer recommendations which are subsequently recalled
during committee meetings, and (iii) addressing of the subjectivity and potential cognitive biases
inherent in the holistic-review process. Towards addressing these limitations, we propose the use of
interactive visual representations of application and evaluation information in the review process.
Visualization solutions present a promising direction to address the drawbacks identifed in
the current information formats and review practices given that they have been used for similar
purposes in diferent contexts. However, their efcacy and how they will, in turn, change and
shape the review process is not known. Additionally, considering that the admissions process
is continually changing, the technology developed to support the process would also involve
continuous change, critique, and improvements.
Based on our observations and identifed reviewer challenges, we suggest the following leverage
points for applying visualization tools under three categories. These suggestions are intended to
both assist in decision making during the largely exploratory individual application reviews and in
turn facilitate presenting applications during the largely explanatory committee meetings.
4.2.1 Visual representations of application atributes. The application attributes, including quantitative information, are currently evaluated by reviewers in largely textual formats. Additionally,
reviewers consider various statistics to assess an applicant’s academic performance and such statistical inferences can be more easily conveyed by visualizations [19]. Visually representing application
attributes (that are quantitative, nominal, or ordinal) by choosing suitable visual encodings [31]
can facilitate reviewer tasks associated with them.
The attribute types presented are consistent across all the applications with only their values
being diferent for every application. Hence, the same visual templates can be consistently used for
all applications.
4.2.2 Integration of Sensemaking and Storytelling tools. We observed that the holistic review
process is comparable to sensemaking [38, 41]. It too involves careful consideration of information,
analyzing and making associations among the various aspects presented, and using the knowledge
acquired to make recommendations. Based on the reviewer behaviors observed, we can draw ideas
for suitable visual tools from sensemaking domains [6, 41, 51].
During individual application reviews, reviewers explore an application to fnd prominent aspects
that they use as evidence for making their recommendations. While they record their key fndings
in the decision sheet (used for summarizing applications), the actual reasoning processes in the
reviewers’ minds consisting of the synthesis of numerous attributes can be quite complex. During
the application review itself, keeping track of these reasoning processes can burden the human
working memory and impose a cognitive load on the reviewers [41]. It is very likely that these
reasoning processes would have long since been forgotten during committee meetings and as a
result, the reviewers mostly rely on the decision sheet to recall an application. We can enable
reviewers to better articulate their reasoning processes with the help of visual tools enabling
knowledge externalization, note-taking, and navigation [6, 41, 42, 51].
These tools can, for example, help reviewers "link" evidence in the application to their opinions,
record their traversal through the application and enable more-efcient note-taking by taking quick
snapshots of the visual attributes and using digital sticky notes. The rationales thus captured can,
for example, inform them to consider alternative claims, help them make a recommendation, and
enable them to prune the captured details using narrative and storytelling visualization techniques
[25, 26, 40] so as to retain the most important fndings for discussion during committee meetings.
Proceedings of the ACM on Human-Computer Interaction, Vol. 2, No. CSCW, Article 169. Publication date: November 2018.


---

## Page 10

169:10 P.T. Sukumar et al.
4.2.3 Visual strategies to mitigate cognitive biases. Reviewer biases are one of the challenges
identifed in the process and this is not surprising given that it is human-driven and inherently
subjective. As mentioned previously, reviewers, who are subject-matter experts (SMEs), use both
their declarative and automated knowledge in reviewing applications. Their automated/procedural
knowledge is learned from their experiences. However, reviewer experiences can substantially
vary and hence their developed intuitions can be expected to be diferent as well. Furthermore, the
holistic review process is not sufciently predictable, i.e. the most-appropriate recommendation to
make for each application is not obvious and the process also does not ofer quick and efcient
feedback to the reviewers on their recommendations to help them hone their procedural knowledge
[22, 23]. Hence even experienced reviewers can be susceptible to cognitive biases when thinking
intuitively.
Cognitive biases can range from perceptual biases to reasoning and judgment biases occurring
during decision making to those that can be infuenced by culture or based on discrimination [49].
We are predominantly interested in identifying and mitigating decision-making biases as part of
our study, i.e. the generalizable biases that can be identifed through common reasoning heuristics
employed in uncertain situations and are not specifc to any individual or groups of individuals.
We identify potential reviewer biases in the process by comparing descriptions of known heuristics and cognitive biases in literature [7, 32, 48] with reviewer tasks ascertained through CTA. We
then provide strategies to mitigate them where possible. While it is possible to identify potential
cognitive biases, determining important biases, i.e. ones with the biggest consequences, is non-trivial
and it may also not be possible to uncover or to develop strategies to counter some of the biases.
In addition to describing the identifed potential cognitive biases within the characterizations, a
summary of the biases and visualization strategies for their mitigation is also presented in Table 1.
While some of the strategies are drawn from bias literature and are not "visualization" strategies
per se, they can also be implemented using the visual representations that we propose to use in the
review process. The rationales for the possible reviewer biases and visualization approaches for
their mitigation are discussed in more detail in our other work [44, 45].
While we propose visualization approaches to address reviewer biases, we are also aware of the
challenges they entail and that devising perfect solutions for alleviating the biases is an impossibility.
Visualizations are being continually explored in relation to bias mitigation and fostering better
understanding compared to textual formats in other contexts. For example, visualizations have
been designed to enable users to reason with conditional probabilities associated with medical
decision-making [30, 35, 47]. While these examples present isolated scenarios and relatively simple
problems where suitable visualizations can be designed and evaluated, holistic reviews are far more
complex where identifying potential reviewer biases as well as designing and evaluating suitable
visualization solutions can be extremely challenging. It is possible that eforts to reduce certain
types of biases in the visualizations can result in making the reviewers susceptible to other and
also, indeterminable bias types. As Drucker states, visualizations have come to be used almost
unquestioningly as forms of data and knowledge representations but their functioning as forms of
knowledge production or interpretation, which are subjective experiences, is less known [18].
Our proposed idea is to visually represent the applications and embed strategies for mitigating
cognitive biases as well as tools enabling efcient note-taking and other decision support seamlessly
in the interface used for application review. We integrate within the detailed characterizations
presented in the following sections specifc suggestions and discussion regarding (i) the attributes
that can be represented visually and the reviewer tasks they can facilitate, (ii) the types of cognitive
biases that can occur during certain reviewer tasks and strategies for mitigating them where
possible, and (iii) how sensemaking tools can be applied in the process.
Proceedings of the ACM on Human-Computer Interaction, Vol. 2, No. CSCW, Article 169. Publication date: November 2018.


---

## Page 11

Making a Pecan Pie 169:11
4.3 Characterization of Individual Application Reviews
In this section, we provide details on how reviewers assess applications and their thought processes
contributing to their recommendations. These details form the crux of the holistic review process
at this university. We also mention the computer tools used for reviewing applications and how
applications are succinctly summarized to facilitate reviewers’ recollection and recapitulation of
them at a later time, i.e. during committee meetings.
4.3.1 Sofware setup. The university requires applications to be submitted through the onlineonly Common Application [2] or Coalition Application [5] which are used by a signifcant number
of universities and colleges in the United States. In addition to one of these, the university also
requires a university-specifc writing supplement, and letters of recommendation (from Counselor
and Teacher) to be included with the application.
For review purposes, the university employs document-management software customized to their
purpose which gathers and organizes entire submitted applications in one database. It also provides
tools to accelerate and ease the decision-making process, such as tools for communication among
reviewers, automatically generating codes for certain application attributes, enabling annotation
and including a decision sheet with every application to record reviewers’ comments and ratings
for the respective application. Reviewers access applications prepopulated on the software and it
synchronizes all the documents and information entered across the system so that all the information
is uniformly visible to all the reviewers. Reviewers use conventional desktop systems for reviewing
applications and some of them used multiple screens (2-3) for viewing.
Discussion: The materialities of the digital database enable efcient organization, storage,
retrieval, and distribution of the applications. Additionally, they also enable coordination or "multiplicity" [16] for multiple reviews for a single application, and make the reviews transparent.
However, they are largely representational rather than interaction-based with annotation being the
key interaction tool.
4.3.2 Decision sheet. The decision sheet for every application serves to record the key points,
both objective and subjective, about the various attributes that the reviewer encounters while
reading the application. It has text-felds allocated to specifc attributes and text-boxes for the
reviewers to enter their viewpoints, summaries, and rationales for their recommendation. Much
of the information entered in the decision sheet for attributes including demographic, academic,
extracurricular, and personal information is in the form of "codes". An example code is "APAH"
for the AP American History (Advanced Placement) course. There can be hundreds of such codes.
The decision sheet is essentially the succinct summary of the application’s review which not only
enables the reviewer to make a recommendation but also helps the reviewer to recall and present
an application during the committee meetings.
Discussion: In studying the materialities of the digital database, we observed that the review
process is intrinsically shaped by the decision sheet. The reviewers appeared to think of reviewing
as being synonymous with flling out the decision sheet. They also thought of others’ reviews
and the committee-meeting discussions in terms of the decision sheet. The codes or abbreviations
used enabled compact representation, quick input, "tagging", and recognition of tags for applicants.
However, the reviewers are required to be familiar with the various codes to use them efciently.
We observed that the cognitive processes of reviewers associated with reviewing an application
amounted to more than the brief summaries they entered in the decision sheet. This, in turn, can
constrain how they recall and discuss the applications during the committee meetings.
By visually representing the application attributes, we can also record their visual summaries in
the decision sheet by means of note-taking and navigation tools [6, 41, 51]. This can help reviewers
Proceedings of the ACM on Human-Computer Interaction, Vol. 2, No. CSCW, Article 169. Publication date: November 2018.


---

## Page 12

169:12 P.T. Sukumar et al.
see their reasoning trail and make better-informed recommendations. The decision sheet can be
populated with snapshots of attribute summaries and excerpts from essays with embedded reviewer
comments and link these snapshots to their locations in the applications. The numerous codes
used in the decision sheet can be replaced by visual icons; for example the non-academic activities
can be replaced by visual symbols representing the activities. Additionally, large screen spaces are
known to support sensemaking tasks [6, 42]; hence the multiple screens used by reviewers can be
leveraged to enable the above functionality.
4.3.3 Overview. Every application is carefully reviewed and many are reviewed multiple times
by multiple reviewers. The order in which the application attributes are reviewed difer among
the reviewers and they also often go back and forth between various attributes before making a
recommendation. Typically, reviewers begin with viewing the demographic information of the
applicant followed by the assessment of the applicant’s academic performance before reading
the letters of recommendation and assessing the non-academic achievements. Reviewers usually
read the essays last before considering the applicant’s preferred major(s) and summarizing their
viewpoints of the application.
4.3.4 1. Demographic Information. The application records the applicant’s demographic information.
4.3.5 2. Family Background. Reviewers typically look for information about the applicant’s family, i.e. if parents are married, what are their educational backgrounds, alma maters and professions,
if the applicant has siblings and if yes, what are their occupations and if any of them has applied or
has been admitted to this university.
“what’s the household like? parents married, dad lawyer, mom business executive ..
three kids, oldest kid goes to [some university] ... household with a lot of opportunities”
Discussion: Reviewers often gauge the socioeconomic status of the applicant from this information and if, say, they think that the applicant is from a privileged background and/or is the only
child, they keep in mind that the applicant has been given ample opportunities while assessing his
or her application attributes. While the strength of holistic reviews lies in such associations made by
reviewers, they can also sometimes lead to cognitive biases. In this example, the bias due to illusory
correlation associated with the availability heuristic [48] can result wherein strongly-associated
events are believed to invariably co-occur.
4.3.6 3. Academic Performance. The academic achievements of the applicant directly infuence
the recommendation made on the application. There can be variation in the grades and scores on
standardized tests (SAT/ACT) among applicants but applicants’ uniqueness and life experiences
can equalize their opportunity for admission.
4.3.7 3.1 High school context and statistics. Several factors are taken into account when assessing
an applicant’s academic performance. The student’s high school provides the main context for
interpreting the student’s academic performance. Reviewers are generally familiar with the high
schools in their assigned geographic area and utilize information regarding the school’s profle,
diversity, and courses ofered in their assessments. Reviewers consider the student’s grades and
understand what the grades mean compared with the rest of the class. The student’s rank in
class, if provided by the school, is very helpful to the reviewers. Admissions ofcers in selective
universities are concerned about the growing trend of schools not providing them with the class
rank information of students which may make it impossible for them to even calculate an "in
the-neighborhood" class rank estimate. The distribution and mean/median assessment of the SAT
Proceedings of the ACM on Human-Computer Interaction, Vol. 2, No. CSCW, Article 169. Publication date: November 2018.


---

## Page 13

Making a Pecan Pie 169:13
and ACT scores for the entire senior class provided by the school are also considered in assessing
and comparing the competitiveness of the entire class from one school to another.
Reviewers also consider the school’s statistics from previous years and make some calculations
regarding how many students from this school were previously admitted to this university and
what is their average GPA, and what other universities or colleges have students from this school
been admitted to. They assess where the applicant in question stands with respect to his or her
present class as well as the students from the school admitted to the university in the previous
years.
“school profle - great. 98% four-year college-going rate. Students accepted into [top
universities] ... Good opportunities provided by school”
4.3.8 3.2 Grade-trends. Reviewers also look for trends in grades, i.e. is there an upward or
downward trend, or are the scores consistent, and are there any low scores that particularly stand
out.
“Grades have all been straight As, good school”
“whole bunch of As, Bs .. why does she have Bs?!”
4.3.9 3.3 AP courses and "rigor". Reviewers scrutinize the courses taken by the applicant and
check the number of Advanced Placement (AP) courses ofered by the school and the ones taken by
the applicant, assess if the applicant has taken advantage of the courses ofered by the school, if the
applicant’s courses satisfy the university’s course-requirements (Math, Science, History, Foreign
Language and English), and if the applicant has challenged himself/herself and demonstrates "rigor."
Reviewers enter the key fndings and their opinions regarding the above factors in the decision
sheet.
“... taking a strong curriculum, she seems to be challenging herself ... trend was up and
rigor is getting better”
“Looking at rigor.. 8 AP classes, student has APs in all the 5 required courses”
Discussion: The digital application database does not adequately support the reviewer tasks for
evaluating an applicant’s academic performance. Many of the tasks, such as ascertaining the merit
of an applicant’s grades and scores with the help of statistical information from the high school,
fnding grade trends and "rigor" in the courses taken, are all done manually by the reviewers and
human error can possibly occur in such manual evaluations.
The variables and statistics considered, e.g., SAT/ACT scores, grades, school’s previous years’
statistics, can be represented visually by selecting appropriate encodings [31] to enable reviewers
to interpret them more easily and facilitate tasks such as comparing scores, fnding trends in grades,
highlighting particularly-low scores, and visualizing student’s rank in class. The required courses
can be color-coded enabling reviewers to quickly spot them in the transcripts. Additionally, more
efcient note-taking tools can help reviewers attach "evidence" in the form of visual snapshots with
their comments and enter them in the decision sheet.
The reviewer tasks associated with the assessment of academic performance are also subject
to cognitive biases. We observed that reviewers better remembered students they interacted with
during their high-school-visits and those who frequently contacted them via email. Reviewers also
tend to recall a lot of information about the school from their high-school-visits during their review
tasks (3.1 above). In both these examples, the bias due to the retrievability of instances associated
with the availability heuristic [48] can occur wherein the information recalled can be incomplete
or biased. In the latter case, availability bias can be mitigated by presenting all the information
needed to assess an attribute concurrently including those easily recalled and not easily recalled by
the reviewers [29].
Proceedings of the ACM on Human-Computer Interaction, Vol. 2, No. CSCW, Article 169. Publication date: November 2018.


---

## Page 14

169:14 P.T. Sukumar et al.
Since most reviewers assessed the academic factors frst before considering other attributes, the
academic performance of the applicant can act as an anchor leading to anchoring bias [48] where
they have a bearing on the subsequent attribute assessments. For example, if an applicant has
excelled in academics, the reviewers may be more optimistic about the applicant’s competence in
other aspects. To counter anchoring bias, the order of the attributes presented can be rearranged so
that conjunctive attributes, i.e. those that are afected by the anchor, are considered non-sequentially.
4.3.10 4. LoRs and TE. Reviewers read the letters of recommendation (LoRs) and teacher evaluation (TE) to fnd if any distinctive aspects about the student are mentioned, or if explanations for
any low grades are provided, or to see if they confrm the student’s talents and capabilities and make
a note of the key fndings in the decision sheet. Experience makes reviewers more astute and they
can quite easily decipher if the LoRs lack genuineness or exaggerate the student’s accomplishments
or merely restate what is already known about the student.
“lists qualities.. explains why [the applicant] didn’t do well in her frst year..”
“[Letter says student is] reliable, [has a] sophisticated understanding of materials ”
“Always looking for something to help me fght for this kid. Searching..”
“[Letter says student] persevered through adversity, tested his limits - but needs it to
be backed up somewhere else”
“[student’s] father had a heart attack .. now the human side steps in”
“ this kid is a rank 9 [in entire school] and there’s no LoR from the guidance counsellor..
why?!”
Discussion: Excerpts from the LoR and essays (discussed in 5. below) usually make for interesting
discussion points during the committee meetings. In reading the LoRs as well as the essays, the
reviewers may be prone to confrmation bias [32] and as a result, may fnd and favor evidence that
matches their judgments regarding the applicant and overlook or disfavor evidence that disconfrms
their judgments.
Single-text visualization methods focusing on capturing the meaning, emotion, writing style, and
an overall feel for the text [27, 33, 50] can assist reviewers in their perusal of LoRs and Essays. They
can not only help the reviewers in identifying the salient points but can also counter confrmation
biases.
4.3.11 4. Non-academic activities. Considerable weight is given to the non-academic activities
of the applicant. These activities can include notable achievements in community service, heading
student organizations, varsity sports, and talents in music and fne arts. These activities are recorded
on the decision sheet using codes. Reviewers not only evaluate the time the applicant has invested
in pursuing those activities but also assess the quality of work done or skills attained. They also
take into account the student’s background and the opportunities, or lack thereof, that the student
may have been exposed to in determining his or her competence.
“so many non-proft organizations founded..that’s a bit contrived”
“[activities:] runs track.. hurdles co-captain ..what is that?!”
“has done some service.. but nothing consistent.. did the student do service just to make
up for lack of activities?”
4.3.12 5. Essays. The applicant’s essays provide reviewers with a window into his/her personal
life and allow them to consider the applicant’s perspective and individuality. Reviewers build a
character profle of the applicant based on the essays, e.g., "vulnerable", "risk-taker", "perfectionist",
"uptight". They especially regard the applicant’s university-specifc writing supplement with
interest and see if the missions and spirit of the university resonate with the applicant to deem
if the applicant will be a good "ft" to the university. Reviewers try to predict how the applicant
Proceedings of the ACM on Human-Computer Interaction, Vol. 2, No. CSCW, Article 169. Publication date: November 2018.


---

## Page 15

Making a Pecan Pie 169:15
might mingle with his peers, the singular fairs he/she will bring to the campus, and the roles the
applicant may take on while at university.
“ [has] a sibling who has [a mental disorder].. has been involved with his brother’s
struggle ... so the student has dealt with some adversity. The story is personal, touching”
“ really into music, uses big vocabulary words”
“she is a good emotional-match to [the university]”
“ uses the extra space on the application to write about himself.. comes out as honorable”
“... would be a good friend to others in his dorm”
“risk taker.. doesn’t want to be put in a box”
Discussion: In addition to confrmation bias discussed above, the reviewers may be prone to the
insensitivity to predictability and illusion of validity biases associated with the representativeness
heuristic [48] when assessing an applicant’s ft to the university. The attributes considered may not
be predictive of the applicant’s ft but the reviewers may nevertheless consider their assessments
valid. The task of determining ft is subjective and it may be useful for the reviewers to collectively
decide on the factors to consider and present these factors alongside the essays during reviews.
This may both reduce the bias as well as standardize the task.
4.3.13 6. Major preference(s). Reviewers also see if the student’s major preference(s) match the
courses taken by the student.
“... applying to [the Business department].. Finance - sole intent ... if truly interested in
[this university], applicants will usually list an alternative major”
“Majority of courses in Social Science.. Is this really a business kid? This is in the back
of my mind [Applicant has listed Business as preferred major]”
4.3.14 7. Optional Resume. Applicants can include a resume with their application and the
reviewers generally expect it to mostly contain the same information as the rest of their application.
“additional resume submitted - not included in application. Sometimes demonstrates that the
student is from a privileged background and knows and has the means to put together a resume”
4.3.15 8. Reviewer ratings and final recommendation. Reviewers provide academic and nonacademic evaluations for the applicant based on their impressions. They also evaluate on leadership
qualities and other special talents of applicants. All their evaluation scores are entered in the
decision sheet along with the fnal summary. Finally, the reviewers recommend to admit, reject, or
waitlist the applicant.
“If it’s a maybe, I’ll see the kid again at committee”
“at the end of the day, there will be more compelling students [recommendation:waitlist]”
4.4 Characterization of commitee-meeting-proceedings
Committee meetings take place after the individual application reviews and a portion of the
reviewed applications are discussed during these meetings. We observed that these meetings are
largely explanatory in nature. The reviewers present their applications and explain the rationales
for their recommendations to the committee. While others sometimes provide inputs based on
quickly browsing through the applications, the recommendations already made on most of the
applications don’t change and no additional discussion material is recorded. However, in the case
of undecided applications, i.e. ones where the frst and second reviewers’ recommendations don’t
match, the committee may make recommendations collectively or a senior member may make the
fnal recommendation. In this section, we discuss the typical sequence of events occurring during
Proceedings of the ACM on Human-Computer Interaction, Vol. 2, No. CSCW, Article 169. Publication date: November 2018.


---

## Page 16

169:16 P.T. Sukumar et al.
the meetings, i.e. how reviewers present their applications, and how the committee discusses these
applications.
4.4.1 Sofware setup. A fle containing applicant summaries is displayed on a large shared screen
in the meeting room. The fle lists applicants ordered by school and by GPA within each school.
The rows represent applicants and their application attributes including recommendation made,
and codes for major, demographic, academic, personal and extracurricular information are listed as
columns. The committee members access the document-management software on their individual
laptops and view the decision sheet and application of the applicant being discussed.
Discussion: The displayed fle resembles a static spreadsheet with information displayed in
"grids", which is the most common type of digital artifact used in group activities within organizations [16]. The materialities of the spreadsheet mainly include serving as an “agenda” for the
discussion of applications and presenting application and review summaries for each applicant
in a row. Reviewers can be said to “own” the rows of applicants whose schools fall within their
assigned geographic regions and for which they are the primary reviewers.
The spreadsheet format enables a compact and aligned display of information, especially through
the use of codes for the various attributes. However, projecting the rather ornate application
information onto a grid format and reducing the entire information for an applicant to a row may
limit the ways in which the applications are discussed during the meetings [16].
4.4.2 Overview. There are usually several members and a leader present during the meetings.
The members each have a set of applications to present from their assigned geographic area(s)
and for which they are the primary reviewers. The applications are presented in the order of their
school groups.
Reviewers verbally present an application to the committee with the help of their notes on
the decision sheet and any other notes they may have recorded while reviewing the application.
The presenters usually begin with a brief summary of the application and academic factors and
then quickly arrive at the rationales for their recommendation, i.e. mention some aspect(s) that
particularly impressed them and/or mention shortcomings in the application. The presenters lead the
discussions on their applications and appear to have an upper hand regarding the recommendation
made because of their familiarity with the application.
Discussion: The presenters tell the stories of the applicants based on their fndings from the
individual reviews. The visual strategies proposed to capture their reasoning processes in a more
organized and structured fashion can also help them in recalling an application better and to
communicate their rationales more clearly to the committee. Narrative and storytelling visualization
strategies [25, 26, 40] can be used both to record as well as organize the visual summaries in the
decision sheet to create succinct and coherent stories for presentation to the committee. They can
also help counter the availability bias that may occur due to retrievablility of instances [48] by
providing a broader context and evidence for their rationales.
4.4.3 1. Brief summary. The presenters set the tone for the applicant right from the start based
on their recommendation and this recommendation is also visible to the committee. They typically
introduce an applicant by mentioning his or her demographic information and by providing a very
brief summary.
4.4.4 2. Applicant’s family. The presenters usually mention the applicant’s parents’ occupations,
educational backgrounds, and alma maters and if they are alumni of the same university. They also
mention information about the applicant’s siblings (if any) - where they are studying and if they
applied to and were admitted to this university.
Proceedings of the ACM on Human-Computer Interaction, Vol. 2, No. CSCW, Article 169. Publication date: November 2018.


---

## Page 17

Making a Pecan Pie 169:17
Potential cognitive biases Visualization strategies for bias
mitigation
4.3 Individual application reviews
4.3.5 Family
Background
Illusory correlation associated with the availability
heuristic [48] occurring when associated events are
always thought to co-occur, e.g., wealthy family and
ample opportunities
Breaking down applications
attribute-wise and enabling the
review of attributes independently
and in diferent orders [22]
4.3.6 Academic
Performance
1. Retrievability of instances associated with the
availability heuristic [48] which can cause
reviewers to better remember the information of
certain high schools
2. Anchoring bias occurring within applications
where attribute encountered (usually academic)
prior to the current one may infuence the
evaluation of the current one.
3. Confrmation bias occurring when reviewers fnd
and favor evidence that confrms their judgments
1. Presenting all the information
needed to assess an attribute
concurrently that are both easily
recalled and not easily recalled
2. Same strategy listed above for
illusory correlation
3. Presenting alternative visual
representations of attribute
information to enable more
introspection
4.3.10 LoRs and
TE
Confrmation bias as in Academic Performance Single-text visualization methods for
highlighting salient points [27, 33, 50]
4.3.12 Essays
1. Confrmation bias as in Academic Performance
2. Biases associated with the representativeness
heuristic in assessing an applicant’s "ft" to the
university which can be subjective and
insufciently predictable
1. Same strategy used for LoRs and TE
2. Deciding on the factors to consider
and present them alongside the essays
or along with the single-text
visualization methods
4.4 Committee
meetings
Reviewers
present their
review
summaries and
recommendation
rationales for
applications
1. Narrative fallacy [22] occurring when there is a
tendency to present "tidy", coherent stories of
applicants
2. Confrmation bias occurring when reviewers
present those aspects that confrm their judgments
3. Availability bias occurring when reviewers recall
those aspects that are easily retrieved from memory
The visual sensemaking tools
described in Section 4.2.2 can enable
the capture of more descriptive
review summaries and help in more
accurate recall and link rationales to
evidence in the applications
Table 1. A summary of the identified potential cognitive biases occurring during the steps of individual
application reviews and commitee meetings and corresponding visualization strategies for their mitigation.
Occasionally, if this information is not mentioned by the presenters, other members ask the
presenters about them.
4.4.5 3. Academic performance. The presenters then elaborate on the high school context and the
academic performance of the applicant. The key fndings regarding the academic accomplishments
that were observed during the individual review are stated. Examples include strong test scores,
AP courses taken, demonstration of "rigor", student’s rank in class, unimpressive scores, and trends
in grades.
While the presenters are mentioning the above information, other members contribute to the
discussion by mentioning some particularly interesting scores of the applicant or that the applicant
would struggle if admitted given certain poor grades or they compare the applicant’s grades
with other students in the school or summarize grade trends. Members also occasionally mention
interesting facts about the school, e.g., "students from this school get into Ivy Leagues". They also
refer to previous years’ statistics to make recommendations, e.g., "what have we done in the last 5
years at this school?"
“15th [rank] in class out of 259.. not the topmost in class”
Proceedings of the ACM on Human-Computer Interaction, Vol. 2, No. CSCW, Article 169. Publication date: November 2018.


---

## Page 18

169:18 P.T. Sukumar et al.
Overall ideas
for visual tools
Observations and fndings of the review
process they address
Suggestions for possible improvements
Interactive,
visual
representations
of application
attributes and
the decision
sheet
• Attributes are currently presented in textual formats.
• Reviewers experience considerable cognitive load and time pressure when reviewing applications.
• Visual encodings can be chosen for the various
scores, statistics, and categorical attributes to facilitate reviewer tasks associated with them [19];
appropriate marks and channels can be selected
by developing data and task abstractions [31].
• For example, position on a common scale can convey a student’s SAT/ACT scores with respect to
the range of scores of admitted students, and the
required AP-courses can be color-coded to fnd
them easily in the transcripts [31].
• Single-text visualizations [27, 33, 50] can aid reviewers in identifying salient and afective points
when reading LoRs and essays.
• Snapshots of these visual representations can be
included in the decision sheet.
Visualization
strategies to
mitigate
cognitive biases
• Cognitive biases can be expected
to occur given the subjectivity
in the process and the possible
development of inconsistent reviewer intuitions as a result of different reviewer experiences and
the holistic-review process being
insufciently predictable.
• Possible biases in the process can be identifed
by comparing reviewer tasks with defnitions of
known biases in literature [48].
• A summary of the possible reviewer biases occurring during the review process and visualization
strategies for their mitigation is presented in Table
1.
Integration of
sensemaking
and storytelling
visualization
tools
• The cognitive-intensive review
process is comparable to sensemaking. Reviewers make numerous associations among applicant
attributes and record their key
fndings to help them make recommendations.
• They also use their recorded fndings to present applicant stories
during committee meetings.
• Efcient note-taking and navigation tools can be
used to take quick snapshots of visual attribute
summaries, excerpts from LoRs and essays, enable
in place digital sticky notes to hold comments,
record reviewer’s reasoning trail in the decision
sheet and link these to "evidence" in the application [6, 41, 51].
• The captured detail in the decision sheet can be
shaped using narrative and storytelling visualization strategies [25, 26] to create succinct and
coherent stories for presentation to the committee.
Table 2. A summary of our suggested visual decision-support tools linking the overall ideas to the observations
and findings of the review process on which they are based, and listing suggestions for possible improvements.
4.4.6 4. Non-academic and personal atributes. In presenting the non-academic attributes of the
applicant, the presenters mention aspect(s) that appealed to or impressed them and/or did not
impress them.
These aspects include the applicant’s non-academic activities, notable events that occurred in
the student’s personal life (e.g., parents’ divorce), commendable personal qualities of the student
(e.g., very communicative), something endearing or exciting or creative that the applicant has
mentioned, or the singular perspectives and experiences, such as cultural, that the student might
bring to campus or the applicant’s essays (e.g., applicant has written a poem about the university).
This information is also usually already recorded in the decision sheet.
Other members mention additional interesting aspects they fnd in the application regarding
these attributes during this discussion and the committee concurs.
Proceedings of the ACM on Human-Computer Interaction, Vol. 2, No. CSCW, Article 169. Publication date: November 2018.


---

## Page 19

Making a Pecan Pie 169:19
“[student’s] non academic activities are not that impressive.. he is the only child..
nothing to push the him over the edge”
“[student] was deferred before but he retook the SAT and got a [high score]” (Committee
thinks it’s very impressive)
“[student’s] father was an alcoholic and he writes about this in his essay” (Committee
sympathizes with the applicant)
4.4.7 5. Rationales for final recommendation. The presenters then put their arguments together
to summarize the rationales for their recommendations. They sometimes also ask the committee if
their recommendation is "OK".
“I think he’s a great ft to [the university]”
“solid student [academically] but nothing stands out”
“the student would have gained admission if their academic scores had been higher ”
4.5 A Note on Class Construction
We briefy touched on this fnal aspect of admissions decision making while listing the challenges
faced by reviewers. We discuss key features of this step based on what we found in literature
[1, 28, 36]. Generally speaking, this aspect is separate from the review process and this is where
the applications are viewed collectively and fnal decisions are made.
The senior members in the admissions department are involved in fnal class construction and
they try to shape the class in accordance with the university’s mission and enrollment goals.
They try to craft a balanced class that fts the particular institution’s goals, such as being a good
representation of the overall population or one that takes advantage of the educational programs
ofered [1]. This can be a very challenging task during which concerns of over-enrollment can
also arise forcing the admissions ofcers to revise their decisions accordingly [1, 28]. This tells us
that there may be more considerations involved in constructing a class in addition to those of the
review process.
The details of class construction have not been studied in recent research [28], although this
step of the process may also present opportunities for employing visualization tools. For example,
Diversity Maps [37] can be used to visualize the multivariate information of groups of applicants
to help the admissions ofcers see the big picture and how well the constructed class fulflls their
institution’s enrollment goals.
5 CONCLUSION
Holistic reviews provide an equitable means to make admissions decisions but have the drawbacks
of being subjective and diferent in practice across colleges. We studied the holistic review process
at a highly-selective, private university through direct observations and interviews. We not only
obtained a very-detailed picture of the nuanced and complex review process but also learned the
elusive complexity of the admissions process of which the review process is a part, thereby proving
the aptness of "the shape of the river" analogy mentioned in the beginning of this paper.
We have presented detailed characterizations of the holistic review process along with the
background information needed to understand the process. The information visualization tools
suggested can not only ease the cognitive load experienced by reviewers and reduce the time
taken to review applications [19] but can also improve other aspects of the process; for example
make aware of or mitigate cognitive biases of reviewers and assist in capturing their rationales
for recommendations more completely and coherently. A summary of our suggested visualization
decision-support tools is presented in Table 2. While our suggested tools can be useful for other
Proceedings of the ACM on Human-Computer Interaction, Vol. 2, No. CSCW, Article 169. Publication date: November 2018.


---

## Page 20

169:20 P.T. Sukumar et al.
universities also employing holistic reviews, tool-design for other universities should ideally proceed
from similar studies characterizing their review processes.
Our work has implications for how future admissions-related research should be conducted
in CSCW and HCI. The current policies and practices of review processes in colleges, in general,
have come to be after numerous developments and amendments over the years and have important sociological foundations. Hence, it is necessary to not only consider the admissions ofcers’
requirements but to also refect upon the sociological implications when making technological
improvements.
6 ACKNOWLEDGMENTS
We wish to thank the admissions ofcers at the university where we conducted our studies for their
cooperation and participation in our research study. We are also very thankful to the reviewers for
providing valuable feedback which helped us make substantial improvements to the paper.
This material is based upon work supported by the National Science Foundation under Grant
No. 1816620.
REFERENCES
[1] 2002. Best Practices in Admissions Decisions. College Entrance Examination Board (2002).
[2] Accessed: 09-12-2017. Apply to College with Common App | The Common Application. http://www.commonapp.org/
[3] Accessed: 09-12-2017. College Admissions Advice - The Choice Blog - The New York Times. https://thechoice.blogs.
nytimes.com/?mcubz=3
[4] Accessed: 09-12-2017. The Vandy Admissions Blog | Vanderbilt University. https://admissions.vanderbilt.edu/
vandybloggers/
[5] Accessed: 09-19-2017. Coalition for Access & Afordability. http://www.coalitionforcollegeaccess.org/
[6] Christopher Andrews, Alex Endert, and Chris North. 2010. Space to think: large high-resolution displays for sensemaking. In Proceedings of the SIGCHI conference on human factors in computing systems. ACM, 55–64.
[7] Elliot Aronson. 1969. The theory of cognitive dissonance: A current perspective. Advances in experimental social
psychology 4 (1969), 1–34.
[8] Michael N Bastedo, Joseph E Howard, and Allyson Flaster. 2016. Holistic admissions after afrmative action: Does
"maximizing" the high school curriculum matter? Educational Evaluation and Policy Analysis 38, 2 (2016), 389–409.
[9] William G Bowen and Derek Bok. 1999. The shape of the river: Long-term consequences of considering race in college and
university admissions. Princeton University Press Princeton, NJ.
[10] Wayne J Camara and Amy Elizabeth Schmidt. 1999. Group Diferences in Standardized Testing and Social Stratifcation.
Report No. 99-5. College Entrance Examination Board (1999).
[11] Kirk Carapezza. August, 2017. DOJ Looks Into Whether Harvard Discriminates Against
Asian-Americans. (August, 2017). Retrieved from http://www.npr.org/2017/08/03/541430130/
trump-admin-looking-into-whether-harvard-discriminates-against-asian-americans.
[12] Richard E Clark, D Feldon, J Van Merrienboer, Kenneth Yates, and Sean Early. 2006. Cognitive task analysis. Spector,
JM, Merrill, MD, van Merriënboer, JJ G., & Driscoll, MP (Eds.) Handbook of research on educational communications and
technology 3 (2006).
[13] Nancy J Cooke. 1994. Varieties of knowledge elicitation techniques. International Journal of Human-Computer Studies
41, 6 (1994), 801–849.
[14] Alan Dix, Janet E. Finlay, Gregory D. Abowd, and Russell Beale. 2003. Human-Computer Interaction (3rd Edition).
Prentice-Hall, Inc., Upper Saddle River, NJ, USA.
[15] Paul Dourish. 2006. Implications for design. In Proceedings of the SIGCHI conference on Human Factors in computing
systems. ACM, 541–550.
[16] Paul Dourish. 2017. The stuf of bits: An essay on the materialities of information. MIT Press.
[17] Paul Dourish and Victoria Bellotti. 1992. Awareness and coordination in shared workspaces. In Proceedings of the 1992
ACM conference on Computer-supported cooperative work. ACM, 107–114.
[18] Johanna Drucker. 2014. Graphesis: Visual forms of knowledge production. Harvard University Press.
[19] Jean-Daniel Fekete, Jarke J Van Wijk, John T Stasko, and Chris North. 2008. The value of information visualization. In
Information visualization. Springer, 1–18.
[20] Daniel Golden. 2007. The Price of Admission: How America’s Ruling Class Buys Its Way into Elite Colleges-and Who Gets
Left Outside the Gates. Broadway Books.
Proceedings of the ACM on Human-Computer Interaction, Vol. 2, No. CSCW, Article 169. Publication date: November 2018.


---

## Page 21

Making a Pecan Pie 169:21
[21] Karen Holtzblatt and Sandra Jones. 1993. Contextual inquiry: A participatory technique for system design. Participatory
design: Principles and practices (1993), 177–210.
[22] Daniel Kahneman. 2011. Thinking, fast and slow. Macmillan.
[23] Daniel Kahneman and Gary Klein. 2009. Conditions for intuitive expertise: a failure to disagree. American psychologist
64, 6 (2009), 515.
[24] Anne Kim. 2016. How the Internet Wrecked College Admissions. (2016). Retrieved from https://www.theatlantic.com/
education/archive/2016/10/how-the-internet-wrecked-college-admissions/504062/.
[25] Cole Nussbaumer Knafic. 2015. Storytelling with data: A data visualization guide for business professionals. John Wiley
& Sons.
[26] Robert Kosara and Jock Mackinlay. 2013. Storytelling: The next step for visualization. Computer 46, 5 (2013), 44–50.
[27] Hugo Liu, Ted Selker, and Henry Lieberman. 2003. Visualizing the afective structure of a text document. In CHI’03
extended abstracts on Human factors in computing systems. ACM, 740–741.
[28] Jerome A Lucido. 2014. How Admission Decisions Get Made. Handbook of strategic enrollment management (2014),
147–173.
[29] Alan M MacEachren. 2015. Visual analytics and uncertainty: Its not about the data. (2015).
[30] Luana Micallef, Pierre Dragicevic, and Jean-Daniel Fekete. 2012. Assessing the efect of visualizations on bayesian
reasoning through crowdsourcing. IEEE Transactions on Visualization and Computer Graphics 18, 12 (2012), 2536–2545.
[31] Tamara Munzner. 2014. Visualization analysis and design. CRC press.
[32] Raymond S Nickerson. 1998. Confrmation bias: A ubiquitous phenomenon in many guises. Review of general psychology
2, 2 (1998), 175.
[33] Jaume Nualart, Mario Pérez-Montoro Gutiérrez, and Mitchell Whitelan. 2014. How we draw texts: a review of
approaches to text visualization and exploration. El Profesional de la Información, 2014, vol. 23, num. 3, p. 221-235 (2014).
[34] Wanda J Orlikowski. 2006. Material knowing: the scafolding of human knowledgeability. European Journal of
Information Systems 15, 5 (2006), 460–466.
[35] Alvitta Ottley, Evan M Peck, Lane T Harrison, Daniel Afergan, Caroline Ziemkiewicz, Holly A Taylor, Paul KJ Han,
and Remco Chang. 2016. Improving Bayesian reasoning: The efects of phrasing, visualization, and spatial ability. IEEE
transactions on visualization and computer graphics 22, 1 (2016), 529–538.
[36] Greg Perfetto, Mérida Escandón, Steve Graf, Gretchen Rigol, and Amy Schmidt. 1999. Toward a Taxonomy of the
Admissions Decision-Making Process: A Public Document Based on the First and Second College Board Conferences
on Admissions Models. College Entrance Examination Board (1999).
[37] Tuan Pham, Rob Hess, Crystal Ju, Eugene Zhang, and Ronald Metoyer. 2010. Visualization of diversity in large
multivariate data sets. IEEE Transactions on Visualization and Computer Graphics 16, 6 (2010), 1053–1062.
[38] Peter Pirolli and Stuart Card. 2005. The sensemaking process and leverage points for analyst technology as identifed
through cognitive task analysis. In Proceedings of international conference on intelligence analysis, Vol. 5. 2–4.
[39] Kjeld Schmidt and Liam Bannon. 1992. Taking CSCW seriously. Computer Supported Cooperative Work (CSCW) 1, 1-2
(1992), 7–40.
[40] Edward Segel and Jefrey Heer. 2010. Narrative visualization: Telling stories with data. IEEE transactions on visualization
and computer graphics 16, 6 (2010), 1139–1148.
[41] Yedendra Babu Shrinivasan and Jarke J van Wijk. 2008. Supporting the analytical reasoning process in information
visualization. In Proceedings of the SIGCHI conference on human factors in computing systems. ACM, 1237–1246.
[42] John Stasko, Carsten Görg, and Zhicheng Liu. 2008. Jigsaw: supporting investigative analysis through interactive
visualization. Information visualization 7, 2 (2008), 118–132.
[43] Jacques Steinberg. 2003. The Gatekeepers: Inside the Admissions Process of a Premier College. Penguin.
[44] Poorna Talkad Sukumar and Ronald Metoyer. 2018. A Visualization Approach to Addressing Reviewer Bias in Holistic
College Admissions. In Cognitive Biases in Visualizations, Geofrey Ellis (Ed.). Springer International Publishing,
Chapter 12.
[45] Poorna Talkad Sukumar, Ronald Metoyer, and Shuai He. 2017. Holistic Reviews in Admissions: Reviewer Biases and
Visualization Strategies to Mitigate Them. In IEEE VIS 2017.
[46] B Alden Thresher. 1966. College Admissions and the Public Interest. (1966).
[47] Jennifer Tsai, Sarah Miller, and Alex Kirlik. 2011. Interactive visualizations to improve Bayesian reasoning. In Proceedings
of the Human Factors and Ergonomics Society Annual Meeting, Vol. 55. SAGE Publications Sage CA: Los Angeles, CA,
385–389.
[48] Amos Tversky and Daniel Kahneman. 1975. Judgment under uncertainty: Heuristics and biases. In Utility, probability,
and human decision making. Springer, 141–162.
[49] André Caldero Valdez, Martina Ziefe, and Michael Sedlmair. 2017. A Framework for Studying Biases in Visualization
Research. In IEEE VIS 2017.
Proceedings of the ACM on Human-Computer Interaction, Vol. 2, No. CSCW, Article 169. Publication date: November 2018.


---

## Page 22

169:22 P.T. Sukumar et al.
[50] Wibke Weber. 2007. Text visualization-what colors tell about a text. In Information Visualization, 2007. IV’07. 11th
International Conference. IEEE, 354–362.
[51] William Wright, David Schroh, Pascale Proulx, Alex Skaburskis, and Brian Cort. 2006. The Sandbox for analysis:
concepts and methods. In Proceedings of the SIGCHI conference on Human Factors in computing systems. ACM, 801–810.
Received April 2018; revised July 2018; accepted September 2018
Proceedings of the ACM on Human-Computer Interaction, Vol. 2, No. CSCW, Article 169. Publication date: November 2018.
