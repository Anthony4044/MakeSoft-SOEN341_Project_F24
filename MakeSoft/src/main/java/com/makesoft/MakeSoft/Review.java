package com.makesoft.MakeSoft;

import jakarta.persistence.*;

@Entity
public class Review {

    @ManyToOne
    @JoinColumn(name = "reviewerId")
    private Student reviewer;

    @ManyToOne
    @JoinColumn(name = "revieweeId")
    private Student reviewee;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private int cooperation;
    private String cooperationComment;
    private int conceptualContribution;
    private String conceptualContributionComment;
    private int practicalContribution;
    private String practicalContributionComment;
    private int workEthic;
    private String workEthicComment;


    public Review() {
    }

    public Review(Student reviewer, Student reviewee, int cooperation, String cooperationComment, int conceptualContribution, String conceptualContributionComment, int practicalContribution, int workEthic, String workEthicComment, String practicalContributionComment) {
        this.reviewer = reviewer;
        this.reviewee = reviewee;
        this.cooperation = cooperation;
        this.cooperationComment = cooperationComment;
        this.conceptualContribution = conceptualContribution;
        this.conceptualContributionComment = conceptualContributionComment;
        this.practicalContribution = practicalContribution;
        this.workEthic = workEthic;
        this.workEthicComment = workEthicComment;
        this.practicalContributionComment = practicalContributionComment;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public Student getReviewer() {
        return reviewer;
    }

    public void setReviewer(Student reviewer) {
        this.reviewer = reviewer;
    }

    public Student getReviewee() {
        return reviewee;
    }

    public void setReviewee(Student reviewee) {
        this.reviewee = reviewee;
    }

    public int getCooperation() {
        return cooperation;
    }

    public void setCooperation(int cooperation) {
        this.cooperation = cooperation;
    }

    public String getCooperationComment() {
        return cooperationComment;
    }

    public void setCooperationComment(String cooperationComment) {
        this.cooperationComment = cooperationComment;
    }

    public int getConceptualContribution() {
        return conceptualContribution;
    }

    public void setConceptualContribution(int conceptualContribution) {
        this.conceptualContribution = conceptualContribution;
    }

    public String getConceptualContributionComment() {
        return conceptualContributionComment;
    }

    public void setConceptualContributionComment(String conceptualContributionComment) {
        this.conceptualContributionComment = conceptualContributionComment;
    }

    public int getPracticalContribution() {
        return practicalContribution;
    }

    public void setPracticalContribution(int practicalContribution) {
        this.practicalContribution = practicalContribution;
    }

    public int getWorkEthic() {
        return workEthic;
    }

    public void setWorkEthic(int workEthic) {
        this.workEthic = workEthic;
    }

    public String getWorkEthicComment() {
        return workEthicComment;
    }

    public void setWorkEthicComment(String workEthicComment) {
        this.workEthicComment = workEthicComment;
    }

    public String getPracticalContributionComment() {
        return practicalContributionComment;
    }

    public void setPracticalContributionComment(String practicalContributionComment) {
        this.practicalContributionComment = practicalContributionComment;
    }
}
