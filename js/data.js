/* =====================================================================
   ONE PLACE TO EDIT news and publications.
   Both the home page (news box + publications list) and news.html
   render from this file — change it here, it updates everywhere.

   NEWS  — newest first. date: "Mon YYYY" (the year is used for grouping
           on the News page). html: the text, links allowed.
   PUBS  — newest first. Each entry becomes a card on the home page;
           `page` points to its detail page in publications/.
   ===================================================================== */

window.SITE_NEWS = [
  { date: "May 2026", html: 'Joined <strong>Dolby Laboratories</strong>, Bangalore, as a Summer Research Intern.' },
  { date: "Apr 2026", html: '<a href="publications/docqac.html">DocQAC</a> has been accepted to <strong>SIGIR 2026</strong>.' },
  { date: "Nov 2025", html: 'Received the <strong>Outstanding Reviewer Award</strong> at EMNLP 2025.' },
  { date: "Aug 2025", html: '<a href="publications/breaking-tokens.html">Breaking Token Into Concepts</a> has been accepted to the <strong>Findings of EMNLP 2025</strong>.' },
  { date: "May 2024", html: 'Joined <strong>IIT Kharagpur</strong> as a Senior Project Officer (Research).' },
  { date: "May 2024", html: '<a href="publications/document-aware.html">Document Aware Contrastive Learning</a> accepted at the <strong>GenIR workshop @ SIGIR 2024</strong>.' },
  { date: "May 2023", html: 'Joined <strong>IIT Hyderabad</strong> as a Research Intern.' }
];

window.SITE_PUBS = [
  {
    year: 2026,
    authors: 'Rahul Mehta, <strong>Kavin R V</strong>, Indrajit Pal, Tushar Abhishek, Pawan Goyal, Manish Gupta',
    title: 'DocQAC: Adaptive Trie-Guided Decoding for Effective In-Document Query Auto-Completion',
    venue: 'SIGIR 2026',
    page: 'publications/docqac.html',
    links: [
      { label: 'PDF',     url: 'https://arxiv.org/pdf/2604.18257' },
      { label: 'arXiv',   url: 'https://arxiv.org/abs/2604.18257' },
      { label: 'Code',    url: 'https://github.com/rahcode7/DocQAC' },
      { label: 'Dataset', url: 'https://bit.ly/3IGEkbH' }
    ],
    tweet: 'https://twitter.com/intent/tweet?text=DocQAC%3A%20Adaptive%20Trie-Guided%20Decoding%20for%20Effective%20In-Document%20Query%20Auto-Completion&url=https%3A%2F%2Farxiv.org%2Fabs%2F2604.18257'
  },
  {
    year: 2025,
    authors: '<strong>Kavin R V</strong>, Pawan Goyal',
    title: 'Breaking Token Into Concepts: Exploring Extreme Compression in Token Representation Via Compositional Shared Semantics',
    venue: 'Findings of EMNLP 2025',
    page: 'publications/breaking-tokens.html',
    links: [
      { label: 'PDF',       url: 'https://aclanthology.org/2025.findings-emnlp.1319.pdf' },
      { label: 'Anthology', url: 'https://aclanthology.org/2025.findings-emnlp.1319/' }
    ],
    tweet: 'https://twitter.com/intent/tweet?text=Breaking%20Token%20Into%20Concepts&url=https%3A%2F%2Faclanthology.org%2F2025.findings-emnlp.1319%2F'
  },
  {
    year: 2024,
    authors: '<strong>Kavin R V</strong>, Maunendra Sankar Desarkar',
    title: 'Document Aware Contrastive Learning Approach for Generative Retrieval',
    venue: 'GenIR Workshop @ SIGIR 2024',
    page: 'publications/document-aware.html',
    links: [
      { label: 'PDF',        url: 'https://openreview.net/pdf?id=P04rZjcgF7' },
      { label: 'OpenReview', url: 'https://openreview.net/forum?id=P04rZjcgF7' }
    ],
    tweet: 'https://twitter.com/intent/tweet?text=Document%20Aware%20Contrastive%20Learning%20Approach%20for%20Generative%20Retrieval&url=https%3A%2F%2Fopenreview.net%2Fforum%3Fid%3DP04rZjcgF7'
  }
];
