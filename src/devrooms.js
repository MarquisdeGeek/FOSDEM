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
      'python': 'Python',
      'HPC and computational science': ROOM_HPC,
      'HPC, Big Data and Data Science': ROOM_HPC,
      'HPC, Big Data, and Data Science': ROOM_HPC,
      'Backup and Disaster Recovery': ROOM_BACKUP_RECOVERY,
      'Backup and Recovery': ROOM_BACKUP_RECOVERY,
      'Minimalistic, Experimental and Emerging Languages': ROOM_MINIMALIST_LANGUAGES,
      'Minimalistic Languages': ROOM_MINIMALIST_LANGUAGES,
      'research': 'Open Research Tools and Technologies',
      'Testing and Automation': ROOM_TESTING,
      'Testing and automation': ROOM_TESTING,
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
      'Embedded Devroom': ROOM_EMBEDDED,
      'libreoffice_devroom': ROOM_LIBRE_OFFICE,
      'LibreOffice Devroom': ROOM_LIBRE_OFFICE,
      'LibreOffice': ROOM_LIBRE_OFFICE,
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
      'ruby': 'Ruby',
      'ooo': 'Apache OpenOffice',
      'openoffice': 'Apache OpenOffice',
      'postgresql_devroom': 'PostgreSQL',
      'postgres': 'PostgreSQL',
      'PostgreSQL Devroom': 'PostgreSQL',
      'ada': ROOM_ADA,
      'Ada Devroom': ROOM_ADA,
      'bsd': ROOM_BSD,
      'BSD Devroom': ROOM_BSD,
      'mysql': ROOM_MYSQL,
      'MySQL and friends': ROOM_MYSQL,
      'MySQL': ROOM_MYSQL,
      'MySQL, MariaDB and Friends': ROOM_MYSQL,
      'MySQL and Friends Devroom': ROOM_MYSQL,
      'distributions': 'Distributions',
      'nosql': 'NoSQL',
      'gnustep': ROOM_GNU_STEP,
      'GNUstep': ROOM_GNU_STEP,
      'configuration_systems_management_devroom': ROOM_CONFIGURATION_MANAGEMENT,
      'Configuration management': ROOM_CONFIGURATION_MANAGEMENT,
      'Configuration Management': ROOM_CONFIGURATION_MANAGEMENT,
      'Config management': ROOM_CONFIGURATION_MANAGEMENT,
      'Configuration and Systems Management Devroom': ROOM_CONFIGURATION_MANAGEMENT,
      'perl': ROOM_PERL,
      'Perl': ROOM_PERL,
      'Perl Devroom': ROOM_PERL,
      'Virtualisation': ROOM_VIRTUALISATION,
      'Virtualization and Cloud Devroom': ROOM_VIRTUALISATION,
      'LLVM': ROOM_LLVM,
      'LLVM Toolchain': ROOM_LLVM,
      'Javascript': 'JavaScript',
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
      'PHP': ROOM_PHP

      // Do we map the following?
      // 'suse': 'opensuse',
      // Others..?
    };
    return mapping[room] || room;
  }

  return {
    unify
  }
}