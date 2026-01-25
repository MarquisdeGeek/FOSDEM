/* jshint node: true */
'use strict';

module.exports = function() {
  const ROOM_CROSS_DESKTOP = 'Cross desktop';
  const ROOM_MOZILLA = 'Mozilla';
  const ROOM_JABBER = 'Jabber';
  const ROOM_EMBEDDED = 'Embedded';
  const ROOM_JAVA = 'Free Java';
  const ROOM_ADA = 'Ada';
  const ROOM_BSD = 'BSD';
  const ROOM_MONO = 'Mono';
  const ROOM_GNU_STEP = 'GNUstep Devroom';
  const ROOM_MYSQL = 'MySQL and Friends';
  const ROOM_MARIADB = 'MariaDB';  
  const ROOM_PERL = 'Perl Programming Languages';
  const ROOM_PHP = 'PHP and friends';
  const ROOM_CONFIGURATION_MANAGEMENT = 'Configuration Systems Management';
  const ROOM_VIRTUALISATION = 'Virtualisation and IaaS';
  const ROOM_LLVM = 'LLVM toolchain';
  const ROOM_LEGAL_POLICY = 'Legal and Policy issues';
  const ROOM_IOT = 'Internet of Things';
  const ROOM_GAME_DEVELOPMENT = 'Open Source Game Development';
  const ROOM_SDR = 'Software Defined Radio';
  const ROOM_XORG = 'X.Org/Graphics';
  const ROOM_LIBRE_OFFICE = 'LibreOffice';
  const ROOM_JBOSS = 'JBoss';
  const ROOM_COMMUNITY = 'Community Development';
  const ROOM_TELEPHONY = 'Telephony';
  const ROOM_SECURITY = 'Security';
  const ROOM_GRAPH = 'Graph Processing';
  const ROOM_SMALLTALK = 'Smalltalk';
  const ROOM_TESTING = 'Testing and Automation';
  const ROOM_HPC = 'HPC and computational science';
  const ROOM_SEARCH = 'Open source search';
  const ROOM_CONTAINERS = 'Containers';
  const ROOM_DEBUGGING = 'Debugging tools';
  const ROOM_DECENTRALISED = 'Decentralised Internet';
  const ROOM_MINIMALIST_LANGUAGES = 'Minimalistic Languages';
  const ROOM_INFRA_MANAGEMENT = 'Infra Management';
  const ROOM_BACKUP_RECOVERY = 'Backup and Recovery';
  const ROOM_REAL_TIME_COMMUNICATIONS = 'Real-time Communications';
  const ROOM_LIGHTNING_TALKS = 'Lightning Talks';
  const ROOM_MATRIX = "Matrix";
  const ROOM_OPEN_DOCUMENT_EDITORS = "Open Document Editors";
  const ROOM_COLLABORATION_CMS = "Collaboration and Content Management";
  const ROOM_GCC = "GCC devroom";
  const ROOM_EDUCATION = "FOSS Educational Programming Languages";
  const ROOM_POSTGRESQL = 'PostgreSQL';
  const ROOM_LEGISTLATIVE = 'Legislative';
  const ROOM_CONFIDENTIAL_COMPUTING = 'Confidential Computing';
  const ROOM_RAILWAYS_OPEN_TRANSPORT = 'Railways and Open Transport';
  const ROOM_DNS = 'DNS';
  const ROOM_VLSI_AND_FPGA = 'Libre-SOC, FPGA and VLSI devroom';
  const ROOM_PERL_AND_RAKU = 'Perl and Raku Programming';
  const ROOM_SBOM = 'Software Bill of Materials devroom';
  const ROOM_OPEN_HARDWARE = 'CAD and Open Hardware';
  const ROOM_PYTHON = 'Python';
  const ROOM_MICROKERNELS = 'Microkernel';
  const ROOM_OPEN_RESEARCH = 'Open Research Tools and Technologies';
  const ROOM_OPEN_MEDIA = 'Open Media';
  const ROOM_JAVASCRIPT = 'JavaScript';
  const ROOM_RUST = 'Rust';
  const ROOM_RUBY = 'Ruby';
  const ROOM_EMULATOR = 'Emulator Development';
  const ROOM_RETROCOMPUTING = 'Retrocomputing';
  const ROOM_GO = 'Go';
  const ROOM_DECLARATIVE_AND_MINIMALISTIC = 'Declarative and Minimalistic';
  const ROOM_LEGAL_AND_POLICY = 'Legal and Policy Issues';
  const ROOM_GAMING = 'Open Source Game Development';
  //
  const ROOM_UNKNOWN = "unknown";

  function unify(room) {
    const mapping = { // in the format 'from': 'to'
      'kde': 'KDE',
      'crossdesktop': ROOM_CROSS_DESKTOP,
      'CrossDesktop Devroom': ROOM_CROSS_DESKTOP,
      'crossdistro': 'CrossDistribution Devroom',
      'mozilla': ROOM_MOZILLA,
      'Mozilla Devroom': ROOM_MOZILLA,
      'jabber': ROOM_JABBER,
      'Jabber and XMPP Devroom': ROOM_JABBER,
      'Decentralised Internet and Privacy': ROOM_DECENTRALISED,
      'Decentralised Internet': ROOM_DECENTRALISED,
      'Decentralized Internet and Privacy': ROOM_DECENTRALISED,
      'python': ROOM_PYTHON,
      'Python Devroom devroom': ROOM_PYTHON,
      'HPC and computational science': ROOM_HPC,
      'HPC, Big Data & Data Science devroom': ROOM_HPC,
      'HPC, Big Data & Data Science': ROOM_HPC,
      'HPC, Big Data and Data Science': ROOM_HPC,
      'HPC, Big Data, and Data Science': ROOM_HPC,
      'Backup and Disaster Recovery': ROOM_BACKUP_RECOVERY,
      'Backup and Recovery': ROOM_BACKUP_RECOVERY,
      'Minimalistic, Experimental and Emerging Languages': ROOM_MINIMALIST_LANGUAGES,
      'Minimalistic Languages': ROOM_MINIMALIST_LANGUAGES,
      'research': ROOM_OPEN_RESEARCH,
      'Open Research Tools and Technology': ROOM_OPEN_RESEARCH,
      'Open Research devroom': ROOM_OPEN_RESEARCH,
      'Open Research': ROOM_OPEN_RESEARCH,
      'Testing and automation': ROOM_TESTING,
      'Testing and Continuous delivery devroom': ROOM_TESTING,
      'Testing and Continuous Delivery': ROOM_TESTING,
      'Open source search': ROOM_SEARCH,
      'Search': ROOM_SEARCH,
      'Containers and Process Isolation': ROOM_CONTAINERS,
      'Linux Containers and Microservices': ROOM_CONTAINERS,
      'Containers': ROOM_CONTAINERS,
      'Debugging tools': ROOM_DEBUGGING,
      'Debugging Tools': ROOM_DEBUGGING,
      'embedded': ROOM_EMBEDDED,
      'Embedded and mobile': ROOM_EMBEDDED,
      'Embedded, Mobile and Automotive': ROOM_EMBEDDED,
      'Embedded, mobile and automotive': ROOM_EMBEDDED,
      'Embedded, Mobile and Automotive devroom': ROOM_EMBEDDED,
      'Embedded Devroom': ROOM_EMBEDDED,
      'libreoffice_devroom': ROOM_LIBRE_OFFICE,
      'LibreOffice Devroom': ROOM_LIBRE_OFFICE,
      'LibreOffice': ROOM_LIBRE_OFFICE,
      'LibreOffice Technology': ROOM_LIBRE_OFFICE,
      'LibreOffice Technology Development Platform': ROOM_LIBRE_OFFICE,
      'open_source_telephony_devroom': ROOM_TELEPHONY,
      'Telephony and Communications Devroom': ROOM_TELEPHONY,
      'Telephony': ROOM_TELEPHONY,
      'Security Devroom': ROOM_SECURITY,
      'Security devroom': ROOM_SECURITY,
      'Security': ROOM_SECURITY,
      'Graph Processing Devroom': ROOM_GRAPH,
      'Graph Processing': ROOM_GRAPH,
      'Graph': ROOM_GRAPH,
      'Graph Systems and Algorithms': ROOM_GRAPH,
      'Smalltalk': ROOM_SMALLTALK,
      'Smalltalk Devroom': ROOM_SMALLTALK,
      'java': ROOM_JAVA,
      'Java': ROOM_JAVA,
      'freejava': ROOM_JAVA,
      'Free Java Devroom': ROOM_JAVA,
      'mono': ROOM_MONO,
      'Mono Devroom': ROOM_MONO,
      'Community Track': ROOM_COMMUNITY,
      'Community Development and Marketing': ROOM_COMMUNITY,
      'Community': ROOM_COMMUNITY,
      'Community devroom': ROOM_COMMUNITY,
      'ruby': ROOM_RUBY,
      'Ruby devroom': ROOM_RUBY,
      'ooo': 'Apache OpenOffice',
      'openoffice': 'Apache OpenOffice',
      'postgresql_devroom': ROOM_POSTGRESQL,
      'postgres': ROOM_POSTGRESQL,
      'PostgreSQL Devroom': ROOM_POSTGRESQL,
      'PostgreSQL devroom': ROOM_POSTGRESQL,
      'ada': ROOM_ADA,
      'Ada Devroom': ROOM_ADA,
      'bsd': ROOM_BSD,
      'BSD Devroom': ROOM_BSD,
      'mysql': ROOM_MYSQL,
      'MySQL and friends': ROOM_MYSQL,
      'MySQL': ROOM_MYSQL,
      'MySQL, MariaDB and Friends': ROOM_MYSQL,
      'MySQL and Friends Devroom': ROOM_MYSQL,
      // Ugh! What should we do here, when we have two projects (MySQL & MariaDB) sharing rooms?
      'MariaDB': ROOM_MARIADB,
      'MariaDB Server': ROOM_MARIADB,
      'MariaDB, MySQL and Friends': ROOM_MARIADB,
      'distributions': 'Distributions',
      'nosql': 'NoSQL',
      'gnustep': ROOM_GNU_STEP,
      'GNUstep': ROOM_GNU_STEP,
      'configuration_systems_management_devroom': ROOM_CONFIGURATION_MANAGEMENT,
      'Configuration management': ROOM_CONFIGURATION_MANAGEMENT,
      'Configuration Management': ROOM_CONFIGURATION_MANAGEMENT,
      'Config management': ROOM_CONFIGURATION_MANAGEMENT,
      'Config Management': ROOM_CONFIGURATION_MANAGEMENT,
      'Configuration and Systems Management Devroom': ROOM_CONFIGURATION_MANAGEMENT,
      'Configuration Systems Management': ROOM_CONFIGURATION_MANAGEMENT,
      'perl': ROOM_PERL,
      'Perl': ROOM_PERL,
      'Perl Devroom': ROOM_PERL,
      'Perl and Raku Programming': ROOM_PERL,
      'Virtualisation': ROOM_VIRTUALISATION,
      'Virtualization and Cloud Devroom': ROOM_VIRTUALISATION,
      'Virtualization and Cloud Infrastructure': ROOM_VIRTUALISATION,
      'LLVM': ROOM_LLVM,
      'LLVM Toolchain': ROOM_LLVM,
      'Javascript': ROOM_JAVASCRIPT,
      'JavaScript devroom': ROOM_JAVASCRIPT,
      'distributions': 'Distributions',
      'Wine': 'Wine Project',
      'Infra Management': ROOM_INFRA_MANAGEMENT,
      'Infra Management Devroom': ROOM_INFRA_MANAGEMENT,
      'Legal and Policy issues': ROOM_LEGAL_POLICY,
      'Legal and policy Issues': ROOM_LEGAL_POLICY,
      'Legal Issues Devroom': ROOM_LEGAL_POLICY,
      'Legal issues': ROOM_LEGAL_POLICY,
      'Legal and policy issues': ROOM_LEGAL_POLICY,
      'Internet of things': ROOM_IOT,
      'IoT': ROOM_IOT,
      'jboss': ROOM_JBOSS,
      'JBoss.org Devroom': ROOM_JBOSS,
      'Game development': ROOM_GAME_DEVELOPMENT,
      'Open Game Development': ROOM_GAME_DEVELOPMENT,
      'Game Development': ROOM_GAME_DEVELOPMENT,
      'Open Source Game Development Devroom': ROOM_GAME_DEVELOPMENT,
      'Software defined radio': ROOM_SDR,
      'Free Software Radio': ROOM_SDR,
      'xorg': ROOM_XORG,
      'X.Org': ROOM_XORG,
      'X.org+OpenICC Devroom': ROOM_XORG,
      'Graphics': ROOM_XORG,
      'PHP &amp; Friends': ROOM_PHP,
      'PHP and friends': ROOM_PHP,
      'PHP and Friends': ROOM_PHP,
      'php': ROOM_PHP,
      'PHP': ROOM_PHP,
      'Real Time': ROOM_REAL_TIME_COMMUNICATIONS,
      'Real Time Communications': ROOM_REAL_TIME_COMMUNICATIONS,
      'Communications': ROOM_REAL_TIME_COMMUNICATIONS,
      'Real Time Communications (RTC)': ROOM_REAL_TIME_COMMUNICATIONS,
      'Lightning talks': ROOM_LIGHTNING_TALKS,
      'Lightning Talks': ROOM_LIGHTNING_TALKS,
      'Lightning Talk': ROOM_LIGHTNING_TALKS,
      'Matrix': ROOM_MATRIX,
      'Matrix.org Foundation & Community': ROOM_MATRIX,
      'Matrix.org Foundation and Community': ROOM_MATRIX,
      'Matrix devroom': ROOM_MATRIX,
      'Open document editors': ROOM_OPEN_DOCUMENT_EDITORS,
      'Open Document editors': ROOM_OPEN_DOCUMENT_EDITORS,
      'Open Document Editors': ROOM_OPEN_DOCUMENT_EDITORS,
      'Collaborative Information and Content Management Applications': ROOM_COLLABORATION_CMS,
      'Collaboration and Content Management': ROOM_COLLABORATION_CMS,
      'GCC (GNU Toolchain)': ROOM_GCC,
      'FOSS Educational Programming Languages devroom': ROOM_EDUCATION,
      'Educational': ROOM_EDUCATION,
      'Open Source In The European Legislative Landscape devroom': ROOM_LEGISTLATIVE,
      'Open Source In The European Legislative Landscape and Beyond': ROOM_LEGISTLATIVE,
      'Confidential Computing devroom': ROOM_CONFIDENTIAL_COMPUTING,
      'Railways and Open Transport devroom': ROOM_RAILWAYS_OPEN_TRANSPORT,
      'DNS devroom': ROOM_DNS,
      'Libre-Open VLSI and FPGA': ROOM_VLSI_AND_FPGA,
      'Perl and Raku devroom': ROOM_PERL_AND_RAKU,
      'Software Bill of Materials (SBOM)': ROOM_SBOM,
      'Software Bill of Materials': ROOM_SBOM,
      'CAD and Open Hardware': ROOM_OPEN_HARDWARE,
      'Open Hardware and CAD/CAM devroom': ROOM_OPEN_HARDWARE,
      'Open Hardware and CAD/CAM': ROOM_OPEN_HARDWARE,
      'Microkernel and Component-based OS': ROOM_MICROKERNELS,
      'Microkernel OS Devroom': ROOM_MICROKERNELS,
      'Microkernel-based operating systems': ROOM_MICROKERNELS,
      'Open Media': ROOM_OPEN_MEDIA,
      'Open media': ROOM_OPEN_MEDIA,
      'Open Media devroom': ROOM_OPEN_MEDIA,
      'Rust devroom': ROOM_RUST,
      'Emulator devroom': ROOM_EMULATOR,
      'Retrocomputing devroom': ROOM_RETROCOMPUTING,
      'Go devroom': ROOM_GO,
      'Minimalistic Languages': ROOM_DECLARATIVE_AND_MINIMALISTIC,
      'Declarative and Minimalistic Computing devroom': ROOM_DECLARATIVE_AND_MINIMALISTIC,
      'Declarative and Minimalistic Computing': ROOM_DECLARATIVE_AND_MINIMALISTIC,
      'Legal and Policy issues': ROOM_LEGAL_AND_POLICY,
      'Legal and Policy Issues devroom': ROOM_LEGAL_AND_POLICY,
      'Legal and Policy': ROOM_LEGAL_AND_POLICY,
      'Legal & Policy': ROOM_LEGAL_AND_POLICY,
      'GCC (GNU Toolchain)': ROOM_GCC,
      'Gaming and VR devroom': ROOM_GAMING,
      //
    
      // Do we map the following?
      // 'suse': 'opensuse',
      // Do we automatically to something magic to ignore case difference?
      // Others..?
    };
    
    if (typeof room === typeof undefined) {
      return ROOM_UNKNOWN;
    }

    return mapping[room] || room;
  }

  return {
    unify
  }
}